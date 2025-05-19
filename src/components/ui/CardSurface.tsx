import { Box } from "@chakra-ui/react";

export function CardSurface({ children }: { children: React.ReactNode }) {
  return (
    <Box
      bg="card"
      color="card-foreground"
      borderRadius="2xl"
      boxShadow="md"
      p={6}
      minH="320px"
      w="full"
      transition="all 0.2s"
      _hover={{
        boxShadow: "2xl",
        transform: "scale(1.01)",
      }}
      className="dark:bg-card dark:text-card-foreground dark:shadow-lg dark:hover:shadow-2xl"
    >
      {children}
    </Box>
  );
}
