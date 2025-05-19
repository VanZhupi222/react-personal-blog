import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Box, VStack, Text, Heading } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

interface FeatureCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
}

export function FeatureCard({
  href,
  icon: Icon,
  title,
  description,
  actionText,
}: FeatureCardProps) {
  const controls = useAnimation();

  return (
    <Link href={href}>
      <motion.div
        style={{ height: '100%' }}
        onMouseEnter={() => controls.start({ scale: 1.12 })}
        onMouseLeave={() => controls.start({ scale: 1 })}
      >
        <Box
          bg="card"
          borderRadius="lg"
          borderWidth={1}
          borderColor="border"
          p={6}
          boxShadow="md"
          _hover={{ bg: 'card' }}
          transition="background 0.2s"
          h="full"
        >
          <Box pt={6}>
            <VStack gap={4} align="center" textAlign="center">
              <Icon size={32} className="text-primary" />
              <VStack gap={2}>
                <Heading as="h3" size="md" fontWeight="semibold" className="text-foreground">
                  {title}
                </Heading>
                <Text className="text-muted-foreground">{description}</Text>
                <motion.div
                  animate={controls}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Text fontSize="sm" fontWeight="medium" className="text-primary">
                    {actionText}
                  </Text>
                </motion.div>
              </VStack>
            </VStack>
          </Box>
        </Box>
      </motion.div>
    </Link>
  );
}
