import { useI18n } from '@/i18n';
import { useTheme } from '@/lib/theme';
import { Icon } from '../Icon';

/** Switches between the light and dark theme. Both icons are always in the markup; CSS shows the one that applies. */
export function ThemeToggle() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  return (
    <button type="button" className="icon-btn theme-btn" aria-pressed={theme === 'dark'} aria-label={t('theme.toggle')} title={t('theme.toggle')} onClick={toggle}>
      <Icon name="moon" size={20} className="theme-moon" />
      <Icon name="sun" size={20} className="theme-sun" />
    </button>
  );
}
