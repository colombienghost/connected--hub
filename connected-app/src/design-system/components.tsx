import React from "react";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Icon, IconName } from "./icons";
import { GlassSurface } from "./glass-surface";
import { Text } from "./text";
import { colors, radius, shadows, spacing, typography } from "./tokens";

export type Screen =
  | "onboarding"
  | "login"
  | "home"
  | "trips"
  | "trip"
  | "shipment"
  | "reservation"
  | "payment"
  | "done"
  | "publish"
  | "published"
  | "messages"
  | "chat"
  | "tracking"
  | "profile"
  | "notifications";

export type Tab = "home" | "trips" | "messages" | "profile";

export type Trip = {
  name: string;
  date: string;
  kg: string;
  price: string;
  rating: string;
  initials: string;
  avatarTone: string;
};

export function LogoMark({ inverse = false, size = 42 }: { inverse?: boolean; size?: number }) {
  const ink = inverse ? colors.white : colors.navy;
  return (
    <View accessibilityLabel="CONNECTED" style={[styles.logoWrap, { height: size + 8, width: size }]}> 
      <View style={[styles.handle, { borderColor: ink, width: size * 0.34 }]} />
      <View style={[styles.case, { backgroundColor: ink, height: size * 0.72, width: size * 0.62 }]}> 
        <Text style={[styles.plane, { color: inverse ? colors.navy : colors.white, fontSize: size * 0.38 }]}>✈</Text>
      </View>
      <View style={styles.wheels}>
        <View style={[styles.wheel, { backgroundColor: ink }]} />
        <View style={[styles.wheel, { backgroundColor: ink }]} />
      </View>
    </View>
  );
}

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  compact = false,
  trailingIcon,
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  compact?: boolean;
  trailingIcon?: IconName;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact && styles.buttonCompact,
        variant === "secondary" && styles.buttonSecondary,
        variant === "outline" && styles.buttonOutline,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.buttonContent}>
        <Text
          style={[
            styles.buttonText,
            variant === "secondary" && styles.buttonTextInverse,
            variant === "outline" && styles.buttonTextOutline,
          ]}
        >
          {title}
        </Text>
        {trailingIcon && (
          <Icon
            color={variant === "secondary" ? colors.white : colors.navy}
            name={trailingIcon}
            size={18}
          />
        )}
      </View>
    </Pressable>
  );
}

export function Card({
  children,
  onPress,
  style,
  accessibilityLabel,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}) {
  if (!onPress) {
    return (
      <GlassSurface
        style={[styles.card, styles.cardStandalone, shadows.card, style]}
      >
        {children}
      </GlassSurface>
    );
  }

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardPressable,
        style,
        pressed && styles.cardPressed,
      ]}
    >
      <GlassSurface style={[styles.card, shadows.card, style]}>
        {children}
      </GlassSurface>
    </Pressable>
  );
}

export function VerifiedBadge({ label = "Vérifiée" }: { label?: string }) {
  return (
    <View style={styles.badge}>
      <Icon color={colors.info} name="check" size={12} strokeWidth={2.5} />
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

export function RouteSummary({ compact = false }: { compact?: boolean }) {
  return (
    <View
      accessibilityLabel="Trajet de Montréal à Abidjan"
      style={[styles.route, compact && styles.routeCompact]}
    >
      <View>
        <Text style={styles.routeCity}>Montréal</Text>
        {!compact && <Text style={styles.routeCode}>YUL</Text>}
      </View>
      <View style={styles.routeTrack}>
        <View style={styles.routeDash} />
        <Icon color={colors.navy} name="plane" size={18} />
        <View style={styles.routeDash} />
      </View>
      <View style={styles.routeEnd}>
        <Text style={styles.routeCity}>Abidjan</Text>
        {!compact && <Text style={styles.routeCode}>ABJ</Text>}
      </View>
    </View>
  );
}

export function TripCard({
  trip,
  onPress,
  recommended = false,
}: {
  trip: Trip;
  onPress: () => void;
  recommended?: boolean;
}) {
  return (
    <Card
      accessibilityLabel={`Trajet de ${trip.name}, ${trip.price}`}
      onPress={onPress}
      style={[styles.tripCard, recommended && styles.recommendedCard]}
    >
      {recommended && (
        <View style={styles.recommendedPill}>
          <Text style={styles.recommendedText}>
            Meilleur trajet · 96 % compatible
          </Text>
        </View>
      )}
      <View style={styles.tripMain}>
        <View style={[styles.avatar, { backgroundColor: trip.avatarTone }]}>
          <Text style={styles.avatarText}>{trip.initials}</Text>
        </View>
        <View style={styles.tripInfo}>
          <View style={styles.inline}>
            <Text style={styles.tripName}>{trip.name}</Text>
            <VerifiedBadge />
          </View>
          <RouteSummary compact />
          <View style={styles.tripMetaRow}>
            <View style={styles.tripMetaItem}>
              <Icon color={colors.textMuted} name="calendar" size={14} />
              <Text style={styles.tripMeta}>{trip.date}</Text>
            </View>
            <View style={styles.tripMetaItem}>
              <Icon color={colors.textMuted} name="weight" size={14} />
              <Text style={styles.tripMeta}>{trip.kg}</Text>
            </View>
          </View>
        </View>
        <View style={styles.tripPriceBox}>
          <Text style={styles.tripPrice}>{trip.price}</Text>
          <Icon color={colors.navy} name="chevron-right" size={22} />
        </View>
      </View>
    </Card>
  );
}

const navItems: { icon: IconName; label: string; id: Screen; tab?: Tab }[] = [
  { icon: "home", label: "Accueil", id: "home", tab: "home" },
  { icon: "route", label: "Trajets", id: "trips", tab: "trips" },
  { icon: "plus", label: "Publier", id: "publish" },
  { icon: "chat", label: "Messages", id: "messages", tab: "messages" },
  { icon: "user", label: "Profil", id: "profile", tab: "profile" },
];

export function BottomNavigation({
  active,
  go,
}: {
  active?: Tab;
  go: (screen: Screen) => void;
}) {
  return (
    <View style={styles.navShell}>
      <GlassSurface style={styles.navGlass} variant="dark" />
      <View style={styles.notchHalo} />
      <View style={styles.navBar}>
        {navItems.map((item, index) => {
          const selected = item.tab === active;
          const central = index === 2;
          return (
            <Pressable
              accessibilityLabel={central ? "Publier un voyage" : item.label}
              accessibilityRole="button"
              key={item.id}
              onPress={() => go(item.id)}
              style={({ pressed }) => [
                styles.navItem,
                central && styles.publishButton,
                pressed && styles.navPressed,
              ]}
            >
              <Icon
                color={
                  central ? colors.navy : selected ? colors.amber : colors.white
                }
                name={item.icon}
                size={central ? 34 : 26}
              />
              {!central && (
                <Text style={[styles.navLabel, selected && styles.navActive]}>
                  {item.label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function AppHeader({
  title,
  back,
  mode,
}: {
  title?: string;
  back?: () => void;
  mode?: boolean;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        {back ? (
          <Pressable
            accessibilityLabel="Retour"
            accessibilityRole="button"
            onPress={back}
            style={styles.headerAction}
          >
            <Icon color={colors.white} name="chevron-left" size={28} />
          </Pressable>
        ) : (
          <LogoMark inverse size={38} />
        )}
        {mode && (
          <View style={styles.modeChip}>
            <Text style={styles.modeText}>Mode expéditeur</Text>
            <Icon color={colors.white} name="sliders" size={18} />
          </View>
        )}
        {!mode && <LogoMark inverse size={30} />}
        <View style={styles.profileMini}>
          <Text style={styles.profileMiniText}>FO</Text>
        </View>
      </View>
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </View>
  );
}

export function ScreenFrame({
  title,
  go,
  active,
  children,
  showNav = false,
}: {
  title: string;
  go: (screen: Screen) => void;
  active?: Tab;
  children: React.ReactNode;
  showNav?: boolean;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.app}>
        <AppHeader title={title} back={() => go(active ?? "home")} />
        <ScrollView
          contentContainerStyle={styles.screenContent}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
        {showNav && <BottomNavigation active={active} go={go} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { alignItems: "center", flex: 1, backgroundColor: colors.navy },
  app: {
    alignSelf: "center",
    flex: 1,
    backgroundColor: colors.warmWhite,
    maxWidth: 480,
    width: "100%",
  },
  screenContent: { padding: spacing[5], paddingBottom: spacing[8] },
  logoWrap: { alignItems: 'center', justifyContent: 'flex-end' },
  handle: { height: 7, borderWidth: 2, borderBottomWidth: 0, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  case: { alignItems: 'center', borderRadius: radius.xs, justifyContent: 'center' },
  plane: { fontWeight: '800', transform: [{ rotate: '-12deg' }] },
  wheels: { flexDirection: 'row', gap: 8, marginTop: 3 },
  wheel: { width: 4, height: 4, borderRadius: 2 },
  button: {
    minHeight: 54,
    borderRadius: radius.md,
    backgroundColor: colors.amber,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[5],
    marginTop: spacing[3],
  },
  buttonCompact: { minHeight: 46, marginTop: 0 },
  buttonSecondary: { backgroundColor: colors.navy },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.navy,
  },
  buttonPressed: { opacity: 0.88, transform: [{ translateY: 1 }] },
  disabled: { opacity: 0.45 },
  buttonText: {
    color: colors.navy,
    fontFamily: typography.sans,
    fontSize: 16,
    fontWeight: "700",
  },
  buttonContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[2],
  },
  buttonTextInverse: { color: colors.white },
  buttonTextOutline: { color: colors.navy },
  card: {
    borderColor: colors.borderSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: "hidden",
    padding: spacing[4],
  },
  cardStandalone: { marginBottom: spacing[3] },
  cardPressable: { borderRadius: radius.md, marginBottom: spacing[3] },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.995 }] },
  badge: {
    alignItems: "center",
    backgroundColor: colors.sky,
    borderRadius: radius.xs,
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  badgeText: { color: colors.info, fontSize: 11, fontWeight: "700" },
  route: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: spacing[3],
  },
  routeCompact: { marginVertical: spacing[2] },
  routeCity: { color: colors.navy, fontSize: 14, fontWeight: "700" },
  routeCode: { color: colors.textTertiary, fontSize: 11, marginTop: 2 },
  routeTrack: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: spacing[2],
  },
  routeDash: {
    borderTopWidth: 1,
    borderColor: colors.textTertiary,
    flex: 1,
    maxWidth: 30,
  },
  routeEnd: { alignItems: "flex-end" },
  tripCard: {},
  recommendedCard: { borderColor: colors.amber, borderWidth: 1.5 },
  recommendedPill: {
    alignSelf: "flex-start",
    backgroundColor: colors.skyLight,
    borderRadius: radius.pill,
    marginBottom: spacing[3],
    paddingHorizontal: spacing[3],
    paddingVertical: 6,
  },
  recommendedText: { color: colors.info, fontSize: 12, fontWeight: "700" },
  tripMain: { alignItems: "center", flexDirection: "row", gap: spacing[3] },
  avatar: {
    alignItems: "center",
    borderRadius: 32,
    height: 60,
    justifyContent: "center",
    width: 60,
  },
  avatarText: { color: colors.navy, fontSize: 17, fontWeight: "800" },
  tripInfo: { flex: 1 },
  inline: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  tripName: { color: colors.navy, fontSize: 17, fontWeight: "800" },
  tripMetaRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing[3] },
  tripMetaItem: { alignItems: "center", flexDirection: "row", gap: 4 },
  tripMeta: { color: colors.textMuted, fontSize: 12 },
  tripPriceBox: {
    alignItems: "flex-end",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  tripPrice: { color: colors.amberPressed, fontSize: 21, fontWeight: "800" },
  navShell: { backgroundColor: colors.navy, height: 84, position: "relative" },
  navGlass: { bottom: 0, left: 0, position: "absolute", right: 0, top: 0 },
  notchHalo: {
    alignSelf: "center",
    backgroundColor: colors.warmWhite,
    borderRadius: 38,
    height: 76,
    position: "absolute",
    top: -22,
    width: 76,
    zIndex: 1,
  },
  navBar: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    height: 84,
    justifyContent: "space-around",
    paddingBottom: 8,
    paddingHorizontal: 8,
    position: "relative",
    zIndex: 2,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    width: 62,
    zIndex: 2,
  },
  navPressed: { opacity: 0.72 },
  publishButton: {
    backgroundColor: colors.amber,
    borderColor: colors.white,
    borderRadius: 32,
    borderWidth: 3,
    elevation: 10,
    height: 64,
    marginTop: -31,
    width: 64,
    zIndex: 3,
    ...shadows.floating,
  },
  navLabel: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 3,
  },
  navActive: { color: colors.amber },
  header: {
    backgroundColor: colors.navy,
    paddingBottom: spacing[6],
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
  },
  headerTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 52,
  },
  headerAction: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  modeChip: {
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.34)",
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing[2],
    marginLeft: "auto",
    marginRight: spacing[3],
    minHeight: 44,
    paddingHorizontal: spacing[3],
  },
  modeText: { color: colors.white, fontSize: 13, fontWeight: "500" },
  profileMini: {
    alignItems: "center",
    backgroundColor: colors.sky,
    borderColor: colors.white,
    borderRadius: 21,
    borderWidth: 2,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  profileMiniText: { color: colors.navy, fontSize: 12, fontWeight: "800" },
  headerTitle: {
    color: colors.white,
    fontFamily: typography.display,
    fontSize: 31,
    fontWeight: "700",
    marginTop: spacing[5],
  },
});
