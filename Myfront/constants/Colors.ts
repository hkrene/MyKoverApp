/**
 * Professional color palette for MyKover app
 * Primary brand color: #22B2DC (MyKover Blue)
 * Secondary colors for different subscription plans and UI elements
 */

const primaryColor = '#22B2DC'; // MyKover Blue
const secondaryColor = '#0a7ea4'; // Darker blue for contrast
const accentColor = '#FF6B6B'; // Red for alerts/important actions
const successColor = '#4CAF50'; // Green for success states

export const Colors = {
  light: {
    text: '#1F2937', // Dark gray for better readability
    background: '#FFFFFF',
    tint: primaryColor,
    icon: '#6B7280', // Medium gray for inactive icons
    tabIconDefault: '#9CA3AF', // Light gray for inactive tab icons
    tabIconSelected: primaryColor,
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    success: successColor,
    warning: '#F59E0B',
    error: '#EF4444',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  dark: {
    text: '#F9FAFB',
    background: '#111827',
    tint: '#60A5FA', // Lighter blue for dark mode
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#60A5FA',
    primary: '#60A5FA',
    secondary: '#3B82F6',
    accent: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    gray: {
      50: '#111827',
      100: '#1F2937',
      200: '#374151',
      300: '#4B5563',
      400: '#6B7280',
      500: '#9CA3AF',
      600: '#D1D5DB',
      700: '#E5E7EB',
      800: '#F3F4F6',
      900: '#F9FAFB',
    },
  },
};
