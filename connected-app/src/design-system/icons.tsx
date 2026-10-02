import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

export type IconName =
  | "home"
  | "route"
  | "plus"
  | "chat"
  | "user"
  | "search"
  | "sliders"
  | "chevron-right"
  | "chevron-left"
  | "close"
  | "check"
  | "shield-check"
  | "star"
  | "calendar"
  | "clock"
  | "package"
  | "weight"
  | "pin"
  | "bell"
  | "card"
  | "qr-code"
  | "plane";

type IconContent = React.ReactNode | ((color: string) => React.ReactNode);

const ICONS: Record<IconName, IconContent> = {
  home: <><Path d="M4.2 11.2 12 4.8l7.8 6.4" /><Path d="M6.6 9.8v9.4h10.8V9.8" /><Path d="M10.4 19.2v-4.6h3.2v4.6" /></>,
  route: <><Circle cx="6" cy="18" r="2.2" /><Circle cx="18" cy="6" r="2.2" /><Path d="M8.1 16.9c4.2-.8 4.2-9.2 7.9-9.9" strokeDasharray="3 2.6" /></>,
  plus: <><Path d="M12 5.5v13M5.5 12h13" /></>,
  chat: <><Path d="M4.5 5.5h15v9h-8.5L6.5 18.5v-4H4.5z" /></>,
  user: <><Circle cx="12" cy="8" r="3.6" /><Path d="M5.2 19.5c.8-3.3 3.5-5 6.8-5s6 1.7 6.8 5" /></>,
  search: <><Circle cx="11" cy="11" r="6.3" /><Path d="M15.8 15.8 20 20" /></>,
  sliders: <><Path d="M4 7.5h2.8M10.8 7.5H20" /><Circle cx="8.8" cy="7.5" r="2.2" /><Path d="M4 12h8.8M16.8 12H20" /><Circle cx="14.8" cy="12" r="2.2" /><Path d="M4 16.5h1.8M9.8 16.5H20" /><Circle cx="7.8" cy="16.5" r="2.2" /></>,
  "chevron-right": <><Path d="M9.5 5.5 16 12l-6.5 6.5" /></>,
  "chevron-left": <><Path d="M14.5 5.5 8 12l6.5 6.5" /></>,
  close: <><Path d="M6.5 6.5l11 11M17.5 6.5l-11 11" /></>,
  check: <><Path d="M5 12.5l4.5 4.5L19 7.5" /></>,
  "shield-check": <><Path d="M12 3.8 18.5 6.2v5c0 4.6-2.8 7.5-6.5 8.8-3.7-1.3-6.5-4.2-6.5-8.8v-5z" /><Path d="M9.3 11.7l1.9 1.9 3.5-3.7" /></>,
  star: <><Path d="M12 4.5l1.9 4.9 5.3.5-4.1 3.5 1.2 5.2-4.3-2.6-4.3 2.6 1.2-5.2-4.1-3.5 5.3-.5z" /></>,
  calendar: <><Rect x="4.5" y="6" width="15" height="13.5" rx="2" /><Path d="M4.5 10.2h15" /><Path d="M9 3.8V6.8M15 3.8V6.8" /></>,
  clock: <><Circle cx="12" cy="12" r="7.8" /><Path d="M12 7.8V12l2.8 1.9" /></>,
  package: <><Path d="M4.5 8 12 4.5 19.5 8v8L12 19.5 4.5 16z" /><Path d="M4.5 8 12 11.5 19.5 8" /><Path d="M12 11.5v8" /></>,
  weight: <><Path d="M12 8.2V5.6" /><Path d="M9.4 5.6h5.2" /><Circle cx="12" cy="14" r="5.8" /></>,
  pin: <><Path d="M12 20.5S6.2 15.2 6.2 10.5a5.8 5.8 0 0 1 11.6 0c0 4.7-5.8 10-5.8 10z" /><Circle cx="12" cy="10.5" r="2.2" /></>,
  bell: <><Path d="M6.6 15.8v-4.6a5.4 5.4 0 0 1 10.8 0v4.6l1.4 2.4H5.2z" /><Path d="M10.3 20.2a1.9 1.9 0 0 0 3.4 0" /></>,
  card: <><Rect x="3.5" y="6.5" width="17" height="11" rx="2" /><Path d="M3.5 10.2h17" /><Path d="M7 14.6h4" /></>,
  "qr-code": (color) => <><Rect x="4" y="4" width="7" height="7" rx="1.5" /><Rect x="13" y="4" width="7" height="7" rx="1.5" /><Rect x="4" y="13" width="7" height="7" rx="1.5" /><Rect x="6.3" y="6.3" width="2.4" height="2.4" fill={color} stroke="none" /><Rect x="15.3" y="6.3" width="2.4" height="2.4" fill={color} stroke="none" /><Rect x="6.3" y="15.3" width="2.4" height="2.4" fill={color} stroke="none" /><Rect x="13.8" y="13.8" width="2.4" height="2.4" fill={color} stroke="none" /><Rect x="17.4" y="13.8" width="2.4" height="2.4" fill={color} stroke="none" /><Rect x="13.8" y="17.4" width="2.4" height="2.4" fill={color} stroke="none" /></>,
  plane: <><Path d="M10.6 13.4 3.8 11l16.7-6.8-6.8 16.7-3.1-7.5z" /><Path d="M10.6 13.4l9.9-9.2" /></>,
};

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

/** Set d'icônes CONNECTED dessinees maison, sur une grille 24x24. */
export function Icon({ name, size = 24, color = "#06254F", strokeWidth = 1.8 }: IconProps) {
  const icon = ICONS[name];

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round">
      {typeof icon === "function" ? icon(color) : icon}
    </Svg>
  );
}
