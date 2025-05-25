import React from 'react';

interface AchievementCardProps {
  achievement: {
    icon: string;
    icongray: string;
    displayName: string;
    description: string;
    achieved: number;
    unlocktime: number;
  };
  isFloating?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

function formatUnlockTime(unlocktime: number) {
  if (!unlocktime) return '';
  const date = new Date(unlocktime * 1000);
  return date.toLocaleDateString();
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement: ach,
  isFloating = false,
  onMouseEnter,
  onMouseLeave,
  className = '',
}) => {
  console.log('ach', ach);
  if (isFloating) {
    return (
      <div
        className={`border-primary bg-popover absolute top-0 left-0 z-30 flex w-full items-center rounded-lg border p-4 shadow-2xl ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <img
          src={ach.achieved ? ach.icon : ach.icongray}
          alt={ach.displayName}
          className="mr-4 h-12 w-12 rounded border bg-white object-cover object-center shadow"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <div
            className={`text-lg font-semibold ${ach.achieved ? 'text-achievement-darkgreen' : 'text-achievement-gray'}`}
          >
            {ach.displayName}
          </div>
          <div className="text-achievement-gray mt-1 text-xs break-words whitespace-normal">
            {ach.description}
          </div>
          {ach.achieved ? (
            <div className="text-achievement-green mt-1 text-xs">
              已达成 {formatUnlockTime(ach.unlocktime)}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`group bg-steam-achievement hover:bg-steam-achievement/80 relative flex min-h-[72px] cursor-pointer items-center gap-3 rounded-lg p-2 shadow-sm transition-all duration-300 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ zIndex: 1 }}
    >
      <img
        src={ach.achieved ? ach.icon : ach.icongray}
        alt={ach.displayName}
        className="h-10 w-10 rounded border bg-white object-cover object-center shadow"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <div
          className={`font-semibold ${ach.achieved ? 'text-achievement-darkgreen' : 'text-achievement-gray'} truncate`}
        >
          {ach.displayName}
        </div>
        <div className="flex flex-col">
          <div
            className={`${ach.achieved ? 'line-clamp-1' : 'line-clamp-2'} text-achievement-gray text-xs`}
          >
            {ach.description}
          </div>
          {ach.achieved ? (
            <div className="text-achievement-green text-xs">
              已达成 {formatUnlockTime(ach.unlocktime)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
