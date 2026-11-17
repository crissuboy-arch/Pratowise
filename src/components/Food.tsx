type TileProps = { size?: number; label: string; className?: string };

function Tile({
  size = 64,
  label,
  className,
  children,
}: TileProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={label}
      className={className}
    >
      <rect width="64" height="64" fill="#F1EAFA" />
      <circle cx="32" cy="32" r="26" fill="#FFFFFF" />
      {children}
    </svg>
  );
}

export function Omelete(props: Omit<TileProps, "label"> & { label?: string }) {
  return (
    <Tile label="Omelete de espinafres com queijo fresco" {...props}>
      <circle cx="32" cy="32" r="21" fill="#F3EDF9" />
      <path
        d="M14 33c0-9 8-15 18-15s18 6 18 15-8 11-18 11-18-2-18-11z"
        fill="#FFC94D"
      />
      <path
        d="M18 34c4 5 12 6 20 5 6-1 9-3 10-6"
        fill="none"
        stroke="#E5A82A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="26" cy="28" rx="3" ry="1.8" fill="#3F9B5B" transform="rotate(-20 26 28)" />
      <ellipse cx="35" cy="26" rx="3" ry="1.8" fill="#3F9B5B" transform="rotate(25 35 26)" />
      <ellipse cx="41" cy="33" rx="3" ry="1.8" fill="#3F9B5B" transform="rotate(-10 41 33)" />
      <ellipse cx="29" cy="36" rx="3" ry="1.8" fill="#3F9B5B" transform="rotate(15 29 36)" />
      <rect x="43" y="40" width="5" height="5" rx="1" fill="#FFFDF5" stroke="#E3DAEC" strokeWidth=".6" />
      <rect x="38" y="44" width="5" height="5" rx="1" fill="#FFFDF5" stroke="#E3DAEC" strokeWidth=".6" />
    </Tile>
  );
}

export function Salmao(props: Omit<TileProps, "label"> & { label?: string }) {
  return (
    <Tile label="Salmão grelhado com grão e legumes" {...props}>
      <circle cx="32" cy="32" r="21" fill="#F3EDF9" />
      <rect x="14" y="23" width="28" height="14" rx="7" fill="#F4876A" transform="rotate(-18 28 30)" />
      <path d="M20 30l14-6M22 34l15-6" stroke="#FFB9A3" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="41" cy="42" r="2.7" fill="#E8BE6C" />
      <circle cx="46" cy="37" r="2.7" fill="#E8BE6C" />
      <circle cx="37" cy="46" r="2.7" fill="#E8BE6C" />
      <circle cx="46" cy="44" r="2.7" fill="#E8BE6C" />
      <circle cx="21" cy="43" r="4" fill="#3F9B5B" />
      <circle cx="26" cy="45" r="3.4" fill="#3F9B5B" />
      <circle cx="17" cy="38" r="2.6" fill="#F28C4B" />
      <circle cx="46" cy="28" r="2.6" fill="#F28C4B" />
    </Tile>
  );
}

export function Sopa(props: Omit<TileProps, "label"> & { label?: string }) {
  return (
    <Tile label="Sopa de lentilhas com pão" {...props}>
      <circle cx="32" cy="32" r="21" fill="#E9E1F3" />
      <circle cx="32" cy="32" r="18" fill="#C9792F" />
      <circle cx="24" cy="26" r="1.8" fill="#8E4A1A" />
      <circle cx="33" cy="22" r="1.8" fill="#8E4A1A" />
      <circle cx="40" cy="30" r="1.8" fill="#8E4A1A" />
      <circle cx="28" cy="38" r="1.8" fill="#8E4A1A" />
      <circle cx="38" cy="40" r="1.8" fill="#8E4A1A" />
      <circle cx="21" cy="34" r="1.6" fill="#E0A25A" />
      <circle cx="31" cy="30" r="1.6" fill="#E0A25A" />
      <circle cx="44" cy="36" r="1.6" fill="#E0A25A" />
      <path d="M22 30c6-6 14-6 20 0" fill="none" stroke="#FFF3DC" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="34" cy="35" rx="2.6" ry="1.4" fill="#3F9B5B" transform="rotate(30 34 35)" />
      <rect x="45" y="44" width="14" height="10" rx="3" fill="#D9A066" stroke="#B9783A" strokeWidth="1" transform="rotate(20 52 49)" />
    </Tile>
  );
}

export function Aveia(props: Omit<TileProps, "label"> & { label?: string }) {
  return (
    <Tile label="Flocos de aveia com fruta" {...props}>
      <circle cx="32" cy="32" r="21" fill="#E9E1F3" />
      <circle cx="32" cy="32" r="18" fill="#EBD6A8" />
      <ellipse cx="24" cy="28" rx="3.4" ry="2" fill="#FFF4D6" transform="rotate(-25 24 28)" />
      <ellipse cx="34" cy="24" rx="3.4" ry="2" fill="#FFF4D6" transform="rotate(20 34 24)" />
      <ellipse cx="40" cy="34" rx="3.4" ry="2" fill="#FFF4D6" transform="rotate(-10 40 34)" />
      <ellipse cx="29" cy="39" rx="3.4" ry="2" fill="#FFF4D6" transform="rotate(30 29 39)" />
      <circle cx="31" cy="31" r="3" fill="#D9534F" />
      <circle cx="37" cy="29" r="2.6" fill="#5B6FB5" />
      <circle cx="26" cy="35" r="2.6" fill="#5B6FB5" />
    </Tile>
  );
}
