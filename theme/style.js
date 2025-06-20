import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F1F5F9', // slate-100
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CBD5E1', // slate-400
  },
  paragraph: {
    fontSize: 14,
    color: '#CBD5E1', // slate-300
    lineHeight: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Backgrounds
  backgroundDark: {
    backgroundColor: '#0F172A', // slate-900
  },
  backgroundSurface: {
    backgroundColor: '#1E293B', // slate-800
  },

  // Containers
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0F172A',
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: '#1E3A8A', // blue-800
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonSecondary: {
    backgroundColor: '#10B981', // emerald-500
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
