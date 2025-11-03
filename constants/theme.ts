/**
 * Võti Tulevikku App Theme
 * Estonian Student Career Fair - Modern Professional Design
 */

// Estonian blue with modern variations
const primaryBlue = '#0066CC';
const darkBlue = '#004080';
const lightBlue = '#E6F2FF';

export const Colors = {
  light: {
    // Primary Estonian blue
    primary: primaryBlue,
    primaryDark: darkBlue,
    primaryLight: lightBlue,
    
    // Modern text colors
    text: '#111827',           // Rich black for readability
    textSecondary: '#6B7280',  // Modern gray
    textTertiary: '#9CA3AF',   // Light gray
    textOnPrimary: '#FFFFFF',
    
    // Modern background system
    background: '#FFFFFF',     // Pure white
    surface: '#FFFFFF',        // Card surfaces
    surfaceSecondary: '#F9FAFB', // Very light gray
    surfaceElevated: '#FFFFFF', // Elevated cards
    
    // Modern UI colors
    tint: primaryBlue,
    border: '#E5E7EB',         // Subtle borders
    divider: '#F3F4F6',        // Subtle dividers
    
    // Tab bar
    tabIconDefault: '#6B7280',
    tabIconSelected: primaryBlue,
    tabBarBackground: '#FFFFFF',
    
    // Status colors
    success: '#10B981',        // Modern green
    warning: '#F59E0B',        // Modern amber
    error: '#EF4444',          // Modern red
  },
  dark: {
    // Primary colors
    primary: primaryBlue,
    primaryDark: lightBlue,
    primaryLight: '#1E40AF',
    
    // Dark mode text
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',
    textOnPrimary: '#FFFFFF',
    
    // Dark backgrounds
    background: '#111827',     // Rich dark
    surface: '#1F2937',        // Card surfaces
    surfaceSecondary: '#374151', // Elevated surfaces
    surfaceElevated: '#2D3748',
    
    // Dark UI colors
    tint: lightBlue,
    border: '#374151',
    divider: '#4B5563',
    
    // Dark tab bar
    tabIconDefault: '#9CA3AF',
    tabIconSelected: lightBlue,
    tabBarBackground: '#1F2937',
    
    // Status colors
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
  },
};

// Modern typography scale
export const Typography = {
  // Headlines
  title1: 'text-3xl font-bold',        // 30px
  title2: 'text-2xl font-bold',        // 24px
  title3: 'text-xl font-semibold',     // 20px
  
  // Body text
  body: 'text-base',                   // 16px
  bodyMedium: 'text-base font-medium', // 16px medium
  caption: 'text-sm',                  // 14px
  small: 'text-xs',                    // 12px
  
  // Interactive elements
  button: 'text-base font-semibold',
  label: 'text-sm font-medium',
};

// Modern spacing system
export const Spacing = {
  xs: 'space-y-1',    // 4px
  sm: 'space-y-2',    // 8px
  md: 'space-y-4',    // 16px
  lg: 'space-y-6',    // 24px
  xl: 'space-y-8',    // 32px
  xxl: 'space-y-12',  // 48px
};
