import React from 'react';
import { Box, Flex, Heading, Text, Stack, VStack, Skeleton } from '@chakra-ui/react';
import { Star, Award, Medal, Trophy } from 'lucide-react';
import { CardSurface } from '@/components/ui/CardSurface';
import { useLeetCodeStore } from '@/store/leetcode';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { toaster } from '@/components/ui/toaster';
import { RefreshButton } from '@/components/ui/RefreshButton';

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <Box w="full" h={2} bg="var(--leetcode-progress-bg)" borderRadius="md" overflow="hidden">
      <Box h={2} borderRadius="md" bg={color} transition="width 0.5s" w={`${value}%`} />
    </Box>
  );
}

export function LeetCodeStatsCard() {
  const { t } = useTranslations();
  const { stats, loading, error, fetchStats } = useLeetCodeStore();

  // Only fetch if no stats and not loading
  React.useEffect(() => {
    if (!stats && !loading && !error) {
      fetchStats();
    }
  }, [stats, loading, error, fetchStats]);

  const handleRefresh = () => {
    fetchStats();
  };

  // Show error toast if fetch fails
  React.useEffect(() => {
    if (error) {
      toaster.error({
        title: 'Error',
        description: error,
        duration: 5000,
      });
    }
  }, [error]);

  return (
    <>
      {/* LeetCode Card Title and Status */}
      <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Flex align="center" gap={2}>
          <Trophy size={20} className="text-primary" />
          <Heading as="h3" fontSize="lg" fontWeight="semibold" className="text-foreground">
            {t.home.activity.leetcode.title}
          </Heading>
        </Flex>
        <RefreshButton onClick={handleRefresh} loading={loading} />
      </Box>
      {/* LeetCode Card Content Surface */}
      <CardSurface>
        {loading ? (
          <VStack gap={4} align="stretch">
            <Flex align="center" gap={2} mb={4}>
              <Skeleton height="32px" width="120px" />
            </Flex>
            <Stack gap={3}>
              <Flex align="center" gap={2}>
                <Skeleton height="20px" width="60px" />
                <Skeleton height="20px" width="80px" ml="auto" />
              </Flex>
              <Skeleton height="8px" />
              <Flex align="center" gap={2}>
                <Skeleton height="20px" width="80px" />
                <Skeleton height="20px" width="80px" ml="auto" />
              </Flex>
              <Skeleton height="8px" />
              <Flex align="center" gap={2}>
                <Skeleton height="20px" width="60px" />
                <Skeleton height="20px" width="80px" ml="auto" />
              </Flex>
              <Skeleton height="8px" />
            </Stack>
            <Flex align="center" justify="space-between" mt={6}>
              <Skeleton height="16px" width="100px" />
              <Skeleton height="16px" width="100px" />
              <Skeleton height="16px" width="100px" />
            </Flex>
            <Flex align="center" justify="space-between" mt={1}>
              <Skeleton height="24px" width="60px" />
              <Skeleton height="24px" width="80px" />
              <Skeleton height="24px" width="60px" />
            </Flex>
          </VStack>
        ) : error ? (
          <VStack gap={4} align="center" justify="center" h="full">
            <Text color="red.500" fontSize="lg" fontWeight="medium">
              {error}
            </Text>
            <Text className="text-muted-foreground" fontSize="sm" textAlign="center">
              {t.home.activity.leetcode.error}
            </Text>
          </VStack>
        ) : stats ? (
          <Box>
            <Flex align="center" gap={2} mb={4}>
              <Text ml="auto" fontSize="2xl" fontWeight="extrabold" className="text-foreground">
                {stats.totalSolved}
              </Text>
              <Text fontSize="lg" fontWeight="semibold" className="text-muted-foreground">
                / {stats.totalQuestions}
              </Text>
            </Flex>
            <Stack gap={3}>
              <Flex align="center" gap={2}>
                <Text fontWeight="medium" className="text-foreground">
                  {t.home.activity.leetcode.easy}
                </Text>
                <Text ml="auto" fontSize="sm" fontWeight="semibold" className="text-foreground">
                  {stats.easySolved} / {stats.totalEasy}
                </Text>
              </Flex>
              <ProgressBar
                value={stats.totalEasy ? (stats.easySolved / stats.totalEasy) * 100 : 0}
                color="#22c55e"
              />
              <Flex align="center" gap={2}>
                <Text fontWeight="medium" className="text-foreground">
                  {t.home.activity.leetcode.medium}
                </Text>
                <Text ml="auto" fontSize="sm" fontWeight="semibold" className="text-foreground">
                  {stats.mediumSolved} / {stats.totalMedium}
                </Text>
              </Flex>
              <ProgressBar
                value={stats.totalMedium ? (stats.mediumSolved / stats.totalMedium) * 100 : 0}
                color="#eab308"
              />
              <Flex align="center" gap={2}>
                <Text fontWeight="medium" className="text-foreground">
                  {t.home.activity.leetcode.hard}
                </Text>
                <Text ml="auto" fontSize="sm" fontWeight="semibold" className="text-foreground">
                  {stats.hardSolved} / {stats.totalHard}
                </Text>
              </Flex>
              <ProgressBar
                value={stats.totalHard ? (stats.hardSolved / stats.totalHard) * 100 : 0}
                color="#ef4444"
              />
            </Stack>
            <Flex align="center" justify="space-between" mt={6} fontSize="xs" fontWeight="semibold">
              <Flex align="center" gap={1}>
                <Star size={16} color="#f7c873" />
                <Text className="text-muted-foreground">{t.home.activity.leetcode.completion}</Text>
              </Flex>
              <Flex align="center" gap={1}>
                <Award size={16} color="#eab308" />
                <Text className="text-muted-foreground">{t.home.activity.leetcode.ranking}</Text>
              </Flex>
              <Flex align="center" gap={1}>
                <Medal size={16} color="#38bdf8" />
                <Text className="text-muted-foreground">{t.home.activity.leetcode.reputation}</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between" mt={1} fontSize="lg" fontWeight="extrabold">
              <Text className="text-foreground">
                {stats.totalQuestions ? ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1) : 0}%
              </Text>
              <Text className="text-foreground">{stats.ranking.toLocaleString()}</Text>
              <Text className="text-foreground">{stats.reputation}</Text>
            </Flex>
          </Box>
        ) : (
          <Text className="text-muted-foreground">{t.home.activity.leetcode.placeholder}</Text>
        )}
      </CardSurface>
    </>
  );
}
