export interface ColorWorld {
  id: string;
  name: string;
  isLight: boolean;
  bgGradient: string;
  bgBase: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  cardBg: string;
  cardBorder: string;
  motesColor: string;
  badgeBg: string;
}

/**
 * Cohesive Cinematic Color Worlds
 * Follows the prompt's exact progression while maintaining 100% razor-sharp contrast:
 * 1. Genesis: Muted Near-Black & Soft Blush (#12090B with subtle champagne-blush halo)
 * 2. Whispers: Dusty Rose Twilight (#220C14 with warm rose ambient glow)
 * 3. The Question: Deep Velvet Burgundy (#3A0B16 with rich wine bloom)
 * 4. Three Days: Warm 35mm Amber & Mahogany (#240D15 with golden hour light)
 * 5. The Archive: Fine Parchment on Velvet (#18090E with ivory paper contrast)
 * 6. The Heart: Nocturnal Obsidian & Blood Red (#070204 with radiant crimson glow)
 * 7. The Future: Golden Rose Dawn (#1D0B12 with soft sunrise horizon glow)
 */
export const COLOR_WORLDS: Record<string, ColorWorld> = {
  dawn: {
    id: 'dawn',
    name: 'Genesis Near-Black & Blush',
    isLight: false,
    bgGradient: 'radial-gradient(ellipse 90% 75% at 50% 36%, #2D101A 0%, #1A0910 50%, #0E0507 100%)',
    bgBase: '#0E0507',
    textPrimary: '#FFFDFC',
    textSecondary: '#EAD1D5',
    textAccent: '#C98291',
    cardBg: 'rgba(45, 16, 26, 0.45)',
    cardBorder: 'rgba(201, 130, 145, 0.3)',
    motesColor: 'rgba(234, 209, 213, 0.45)',
    badgeBg: 'rgba(45, 16, 26, 0.5)',
  },
  twilight: {
    id: 'twilight',
    name: 'Dusty Rose Twilight',
    isLight: false,
    bgGradient: 'radial-gradient(ellipse 90% 70% at 50% 38%, #3D1422 0%, #220B13 55%, #100408 100%)',
    bgBase: '#100408',
    textPrimary: '#FFFDFC',
    textSecondary: '#EAD1D5',
    textAccent: '#D88A9A',
    cardBg: 'rgba(61, 20, 34, 0.45)',
    cardBorder: 'rgba(216, 138, 154, 0.35)',
    motesColor: 'rgba(234, 209, 213, 0.5)',
    badgeBg: 'rgba(61, 20, 34, 0.5)',
  },
  burgundy: {
    id: 'burgundy',
    name: 'Velvet Burgundy',
    isLight: false,
    bgGradient: 'radial-gradient(ellipse 85% 65% at 50% 40%, #5C1724 0%, #2E0B13 60%, #100306 100%)',
    bgBase: '#100306',
    textPrimary: '#FFFDFC',
    textSecondary: '#FFD1DA',
    textAccent: '#FF4D6D',
    cardBg: 'rgba(92, 23, 36, 0.45)',
    cardBorder: 'rgba(255, 77, 109, 0.35)',
    motesColor: 'rgba(255, 163, 181, 0.5)',
    badgeBg: 'rgba(92, 23, 36, 0.6)',
  },
  goldenHour: {
    id: 'goldenHour',
    name: '35mm Golden Wine',
    isLight: false,
    bgGradient: 'radial-gradient(ellipse 90% 70% at 50% 42%, #421622 0%, #260B13 58%, #0F0307 100%)',
    bgBase: '#0F0307',
    textPrimary: '#FFFDFC',
    textSecondary: '#F5DAC0',
    textAccent: '#E09875',
    cardBg: 'rgba(66, 22, 34, 0.45)',
    cardBorder: 'rgba(245, 218, 192, 0.3)',
    motesColor: 'rgba(245, 218, 192, 0.5)',
    badgeBg: 'rgba(66, 22, 34, 0.5)',
  },
  parchment: {
    id: 'parchment',
    name: 'Warm Archive Desk',
    isLight: false,
    bgGradient: 'radial-gradient(ellipse 90% 70% at 50% 38%, #33111B 0%, #1C0A10 58%, #0C0407 100%)',
    bgBase: '#0C0407',
    textPrimary: '#FFFDFC',
    textSecondary: '#EAD1D5',
    textAccent: '#C98291',
    cardBg: 'rgba(51, 17, 27, 0.45)',
    cardBorder: 'rgba(201, 130, 145, 0.3)',
    motesColor: 'rgba(234, 209, 213, 0.45)',
    badgeBg: 'rgba(51, 17, 27, 0.5)',
  },
  nocturne: {
    id: 'nocturne',
    name: 'Obsidian & Blood Pulse',
    isLight: false,
    bgGradient: 'radial-gradient(ellipse 85% 75% at 50% 45%, #2B040A 0%, #120205 60%, #050102 100%)',
    bgBase: '#050102',
    textPrimary: '#FFFDFC',
    textSecondary: '#FFA3B5',
    textAccent: '#FF2E55',
    cardBg: 'rgba(43, 4, 10, 0.5)',
    cardBorder: 'rgba(255, 46, 85, 0.4)',
    motesColor: 'rgba(255, 74, 104, 0.65)',
    badgeBg: 'rgba(43, 4, 10, 0.6)',
  },
  futureDawn: {
    id: 'futureDawn',
    name: 'Golden Rose Dawn',
    isLight: false,
    bgGradient: 'radial-gradient(ellipse 90% 75% at 50% 35%, #35131E 0%, #1E0A12 55%, #0D0407 100%)',
    bgBase: '#0D0407',
    textPrimary: '#FFFDFC',
    textSecondary: '#EAD1D5',
    textAccent: '#E09875',
    cardBg: 'rgba(53, 19, 30, 0.45)',
    cardBorder: 'rgba(201, 130, 145, 0.3)',
    motesColor: 'rgba(234, 209, 213, 0.45)',
    badgeBg: 'rgba(53, 19, 30, 0.5)',
  },
};

export function getColorWorldForScene(scene: number): ColorWorld {
  if (scene <= 4) return COLOR_WORLDS.dawn;
  if (scene <= 8) return COLOR_WORLDS.twilight;
  if (scene <= 16) return COLOR_WORLDS.burgundy;
  if (scene <= 28) return COLOR_WORLDS.goldenHour;
  if (scene <= 37) return COLOR_WORLDS.parchment;
  if (scene <= 40) return COLOR_WORLDS.nocturne;
  return COLOR_WORLDS.futureDawn;
}
