import React, { useState } from 'react';
import {
  Bot,
  Rocket,
  Flame,
  Gamepad2,
  Brain,
  Compass,
  User,
} from 'lucide-react';
import { DEFAULT_AVATARS } from '../../lib/storage';

const AVATAR_ICONS = {
  Bot,
  Rocket,
  Flame,
  Gamepad2,
  Brain,
  Compass,
};

const SIZE_CLASSES = {
  xs: {
    container: 'w-6 h-6 rounded-lg',
    inner: 'rounded-[6px]',
    icon: 'w-3.5 h-3.5',
  },
  sm: {
    container: 'w-8 h-8 rounded-xl',
    inner: 'rounded-[10px]',
    icon: 'w-4 h-4',
  },
  md: {
    container: 'w-10 h-10 rounded-2xl',
    inner: 'rounded-[14px]',
    icon: 'w-5 h-5',
  },
  lg: {
    container: 'w-14 h-14 rounded-2xl',
    inner: 'rounded-[14px]',
    icon: 'w-7 h-7',
  },
  xl: {
    container: 'w-20 h-20 rounded-3xl',
    inner: 'rounded-[20px]',
    icon: 'w-10 h-10',
  },
  '2xl': {
    container: 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl',
    inner: 'rounded-[22px]',
    icon: 'w-12 h-12',
  },
};

export default function UserAvatar({
  user,
  avatarUrl: directUrl,
  avatarId: directId,
  name: directName,
  size = 'md',
  className = '',
  showGlow = false,
}) {
  const [imgError, setImgError] = useState(false);

  const avatarUrl = directUrl !== undefined ? directUrl : user?.avatarUrl;
  const avatarId = directId !== undefined ? directId : user?.avatarId;
  const name = directName !== undefined ? directName : user?.name || 'User';

  const sizeCfg = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const matchedPreset = DEFAULT_AVATARS.find((a) => a.id === avatarId) || DEFAULT_AVATARS[0];
  const IconComp = AVATAR_ICONS[matchedPreset?.icon] || User;
  const gradientBg = matchedPreset?.bg || 'from-indigo-600 via-indigo-500 to-cyan-400';

  const glowClass = showGlow ? 'shadow-glow-primary' : '';

  if (avatarUrl && !imgError) {
    return (
      <div
        className={`relative p-0.5 bg-blue-600 shrink-0 overflow-hidden ${sizeCfg.container} ${glowClass} ${className}`}
      >
        <img
          src={avatarUrl}
          alt={name}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover bg-slate-900 ${sizeCfg.inner}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative p-0.5 bg-gradient-to-tr ${gradientBg} shrink-0 ${sizeCfg.container} ${glowClass} ${className}`}
    >
      <div
        className={`w-full h-full bg-[#131722] flex items-center justify-center text-cyan-400 ${sizeCfg.inner}`}
      >
        <IconComp className={sizeCfg.icon} />
      </div>
    </div>
  );
}
