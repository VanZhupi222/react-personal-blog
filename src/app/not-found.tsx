'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/useTranslations';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';

export default function NotFound() {
  const { t } = useTranslations();

  return (
    <Flex minH="100vh" direction="column" align="center" justify="center" bg="gray.50" px={4}>
      <Heading
        fontSize={{ base: '7xl', md: '9xl' }}
        fontWeight="extrabold"
        color="blue.500"
        mb={2}
        letterSpacing="tight"
        lineHeight="1"
      >
        404
      </Heading>
      <Text fontSize={{ base: 'xl', md: '2xl' }} color="gray.700" fontWeight="semibold" mb={10} mt={2}>
        {t.notFound.description}
      </Text>
      <Link href="/">
        <Button
          size="lg"
          colorScheme="blue"
          borderRadius="full"
          px={8}
          py={6}
          boxShadow="lg"
          fontWeight="bold"
          fontSize="lg"
          _hover={{ transform: 'scale(1.05)', boxShadow: '2xl' }}
          transition="all 0.2s"
        >
          <ArrowLeft style={{ marginRight: 8, width: 20, height: 20 }} />
          {t.notFound.backHome}
        </Button>
      </Link>
    </Flex>
  );
}
