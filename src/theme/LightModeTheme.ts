interface LightModeTheme {
  colors: {
    background: string;
    text: string;
    textSecondary: string;
    buttons: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    reminder: string;
    alert: string;
    success: string;
    error: string;
    graphic: string;
  };
}

export const lightModeTheme: LightModeTheme = {
  colors: {
    background: '#FDFDFB',
    text: '#111827',
    textSecondary: '#9CA3AF',
    buttons: {
      primary: '#4CAF92',
      secondary: '#5C9CED',
      tertiary: '#d83320',
    },
    reminder: '#FCD34D',
    alert: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    graphic: '#9D78E4',
  },
};
