"use client";

import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  Skeleton,
  VStack,
  HStack,
  Image,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useSteamStore } from "@/store/steam";
import { useTranslations } from "@/lib/hooks/useTranslations";
import Link from "next/link";
import type { ParsedGame } from "@/lib/steam/parse";
import { RefreshButton } from '@/components/ui/RefreshButton';
import { Gamepad } from 'lucide-react';

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h`;
}

export function SteamStatsCard() {
  const { t } = useTranslations();
  const {
    profile,
    recentGames,
    ownedGamesLoading,
    fetchOwnedGames,
    totalPlaytime,
    error,
  } = useSteamStore();

  React.useEffect(() => {
    if (!profile && !ownedGamesLoading && !error) {
      fetchOwnedGames();
    }
  }, [profile, ownedGamesLoading, error, fetchOwnedGames]);

  const handleGameClick = (appid: number) => {
    window.open(`https://steamcommunity.com/app/${appid}`, "_blank");
  };

  const handleRefresh = () => {
    fetchOwnedGames();
  };

  return (
    <>
      {/* Steam Card Title and Status */}
      <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Flex align="center" gap={2}>
          <Gamepad size={20} className="text-primary" />
          <Heading as="h3" fontSize="lg" fontWeight="semibold" className="text-foreground">
            {t.home.activity.steam.title}
          </Heading>
        </Flex>
        <RefreshButton onClick={handleRefresh} loading={ownedGamesLoading} />
      </Box>

      <Box
        bg="popover"
        boxShadow="lg"
        borderRadius="2xl"
        p={6}
        minH="320px"
        w="full"
        transition="0.3s"
        _hover={{ boxShadow: "2xl", transform: "scale(1.01)" }}
        className="dark:bg-popover dark:border-border"
      >
        {ownedGamesLoading ? (
          <VStack gap={4} align="stretch">
            <Skeleton height="20px" width="60%" />
            <Skeleton height="100px" />
            <Skeleton height="20px" width="40%" />
            <Skeleton height="100px" />
          </VStack>
        ) : error ? (
          <VStack gap={4} align="center" justify="center" h="full">
            <Text color="red.500" fontSize="lg" fontWeight="medium">
              {error}
            </Text>
            <Text className="text-muted-foreground" fontSize="sm" textAlign="center">
              {t.home.activity.steam.error}
            </Text>
          </VStack>
        ) : profile ? (
          <VStack align="stretch" gap={6} h="full">
            {/* Profile Section */}
            <Flex align="center" gap={4}>
              <Image
                src={profile.avatar}
                alt={profile.personaname}
                h={12}
                w={12}
                borderRadius="full"
                bg="muted"
                className="dark:bg-muted"
              />
              <Box>
                <Text fontWeight="bold" fontSize="xl" className="text-foreground">
                  {profile.personaname}
                </Text>
                <Badge
                  colorScheme={profile.personastate === 1 ? "green" : "gray"}
                  fontSize="0.8em"
                  mt={1}
                >
                  {profile.personastate === 1 ? "Online" : "Offline"}
                </Badge>
              </Box>
              <Box ml="auto" textAlign="right">
                <HStack className="text-muted-foreground" gap={1} justify="flex-end">
                  <Box as="span" fontSize="sm">⏱️</Box>
                  <Text fontSize="sm">Total Playtime</Text>
                </HStack>
                <Text fontWeight="bold" fontSize="lg" className="text-foreground">
                  {formatPlaytime(totalPlaytime)}
                </Text>
              </Box>
            </Flex>

            {/* Recent Games Section */}
            {recentGames.length > 0 && (
              <Box>
                <Text mb={2} fontSize="sm" className="text-muted-foreground" fontWeight="medium">
                  Recent Games
                </Text>
                <VStack align="stretch" gap={3}>
                  {recentGames.map((game: ParsedGame) => (
                    <Flex
                      key={game.appid}
                      align="center"
                      gap={3}
                      cursor="pointer"
                      _hover={{ bg: "accent", boxShadow: "md" }}
                      p={2}
                      borderRadius="lg"
                      transition="background 0.2s, box-shadow 0.2s"
                      onClick={() => handleGameClick(game.appid)}
                      className="dark:hover:bg-accent dark:shadow-none dark:hover:shadow-lg"
                    >
                      <Image
                        src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.logo}.jpg`}
                        alt={game.name}
                        h={10}
                        w={10}
                        minW={10}
                        minH={10}
                        borderRadius="md"
                        bg="muted"
                        className="dark:bg-muted"
                        objectFit="cover"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.onerror = null;
                          img.src = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.icon}.jpg`;
                        }}
                      />
                      <Box flex={1} minW={0}>
                        <HStack>
                          <Text truncate fontWeight="medium" className="text-foreground">
                            {game.name}
                          </Text>
                        </HStack>
                      </Box>
                      <Text fontSize="sm" fontWeight="medium" className="text-foreground">
                        {formatPlaytime(game.playtime)}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            )}
            <Box mt={4} textAlign="center">
              <Link href="/achievements">
                <Button
                  bg="var(--card)"
                  color="var(--text-muted-foreground)"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontWeight="bold"
                  boxShadow="md"
                  _hover={{ bg: "gray.100", color: "black", boxShadow: "lg", cursor: "pointer" }}
                  display="inline-flex"
                  minW={0}
                  whiteSpace="nowrap"
                >
                  <Box as="span" fontSize="sm" mr={2}>🏆</Box>
                  View Achievements
                </Button>
              </Link>
            </Box>
          </VStack>
        ) : (
          <Text className="text-muted-foreground">{t.home.activity.steam.placeholder}</Text>
        )}
      </Box>
    </>
  );
}
