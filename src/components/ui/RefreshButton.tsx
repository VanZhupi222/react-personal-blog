import React from 'react';
import { Button } from '@chakra-ui/react';
import { RefreshCw } from 'lucide-react';

export function RefreshButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <Button size="sm" onClick={onClick} p={1} minW="auto" variant="ghost" disabled={loading}>
      <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
    </Button>
  );
}
