interface DarkModeTheme {
  colors: {
    background: string;
    navbar: string;
    texts: string;
    textSecondary: string;
    buttons: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    inputs: {
      backgroundColor: string;
      borderColor: string;
      color: string;
    };
    reminder: string;
    alert: string;
    success: string;
    error: string;
    graphic: string;
  };
}

export const darkModeTheme: DarkModeTheme = {
  colors: {
    background: '#1F2937',
    navbar: '#FDFDFB',
    texts: '#FFFFFF',
    textSecondary: '#9CA3AF',
    buttons: {
      primary: '#4CAF92',
      secondary: '#5C9CED',
      tertiary: '#d83320',
    },
    inputs: {
      backgroundColor: '#374151',
      borderColor: '#4CAF92',
      color: '#FFFFFF',
    },
    reminder: '#FCD34D',
    alert: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    graphic: '#9D78E4',
  },
};
