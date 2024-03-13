"use client";

import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";

const MAX_SHOWN_OTHER_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = users.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_OTHER_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (Me)`}
            fallback={currentUser.info?.name?.[0] || "T"}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_OTHER_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_OTHER_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 w-[100px] bg-white rounded-md p-3 flex items-center shadow-md" />
  );
};
