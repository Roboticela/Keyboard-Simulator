import { modifiersForKeyDisplay } from '@/lib/key-display';
import type { KeyboardButton } from '@/lib/keyboard-button-types';
import { windowsShortcutEntries } from '@/lib/content/quiz-shortcuts';

const NUMPAD_ALWAYS_PRIMARY_IDS = new Set([
  'numlock',
  'num-slash',
  'num-multiply',
  'num-minus',
  'num-plus',
  'num-enter',
]);

const DEFAULT_UNUSED_DESCRIPTION =
  'Not used by default — you can assign your own shortcut in apps';

const SPECIAL_KEYS = new Set([
  'Escape', 'Tab', 'Enter', 'Backspace', 'Delete', 'Insert', 'Home', 'End',
  'PageUp', 'PageDown', 'CapsLock', 'NumLock', 'ScrollLock', 'PrintScreen',
  'Pause', 'Break', 'ContextMenu', 'Fn', 'Shift', 'Control', 'Alt', 'Meta',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
]);

export interface KeyModifiers {
  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  meta: boolean;
  fn: boolean;
}

function resolveKeyFromConfig(
  buttonConfig: Pick<KeyboardButton, 'id' | 'primary' | 'secondary'>,
  numLock: boolean,
): { primary: string; secondary: string } {
  const primary = buttonConfig.primary;
  const secondary = buttonConfig.secondary || '';

  if (
    buttonConfig.id.startsWith('num') &&
    !NUMPAD_ALWAYS_PRIMARY_IDS.has(buttonConfig.id) &&
    !numLock &&
    secondary
  ) {
    return { primary: secondary, secondary: '' };
  }

  return { primary, secondary };
}

function normalizeShortcut(shortcut: string): string {
  return shortcut
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s\+\s/g, '+');
}

function formatKeyLabel(primary: string): string {
  const labels: Record<string, string> = {
    ArrowUp: 'Up Arrow',
    ArrowDown: 'Down Arrow',
    ArrowLeft: 'Left Arrow',
    ArrowRight: 'Right Arrow',
    PageUp: 'Page Up',
    PageDown: 'Page Down',
    Escape: 'Esc',
    PrintScreen: 'PrtScn',
    ContextMenu: 'Menu',
    ' ': 'Space',
    '+': 'Plus',
    '-': 'Minus',
    '.': 'Period',
    ',': 'Comma',
    '/': 'Slash',
    '*': 'Multiply',
  };

  if (labels[primary]) return labels[primary];
  if (/^F\d+$/i.test(primary)) return primary.toUpperCase();
  if (primary.length === 1 && /[a-z]/i.test(primary)) return primary.toUpperCase();
  return primary;
}

function buildShortcutLabel(modifiers: KeyModifiers, keyLabel: string, primaryKey?: string): string {
  const displayModifiers = modifiersForKeyDisplay(primaryKey ?? keyLabel, modifiers);
  const parts: string[] = [];
  if (displayModifiers.ctrl) parts.push('Ctrl');
  if (displayModifiers.alt) parts.push('Alt');
  if (displayModifiers.shift) parts.push('Shift');
  if (displayModifiers.meta) parts.push('Win');
  if (displayModifiers.fn) parts.push('Fn');
  parts.push(keyLabel);
  return parts.join(' + ');
}

const SHORTCUT_DESCRIPTIONS = new Map<string, string>();

for (const entry of windowsShortcutEntries) {
  SHORTCUT_DESCRIPTIONS.set(normalizeShortcut(entry.shortcut), entry.correct);
}

// Extra common Windows shortcuts not in the quiz list
const EXTRA_SHORTCUTS: Record<string, string> = {
  'ctrl+f1': 'Open help (varies by app)',
  'ctrl+f2': 'Rename or open print preview (varies by app)',
  'ctrl+f3': 'Open search (varies by app)',
  'ctrl+f4': 'Close tab or window (varies by app)',
  'ctrl+f6': 'Cycle focus between panes (varies by app)',
  'ctrl+f7': 'Caret browsing or spell check (varies by app)',
  'ctrl+f8': 'Open Safe Mode at boot when pressed during startup',
  'ctrl+f9': 'Minimize window (varies by app)',
  'ctrl+f10': 'Maximize window or activate menu bar (varies by app)',
  'ctrl+f11': 'Toggle full screen (varies by app)',
  'ctrl+f12': 'Open Save As (varies by app)',
  'shift+f1': 'Context help (varies by app)',
  'shift+f2': 'Paste name or edit cell (varies by app)',
  'shift+f3': 'Open function list (varies by app)',
  'shift+f4': 'Repeat last action (varies by app)',
  'shift+f5': 'Open Find or Go To dialog (varies by app)',
  'shift+f6': 'Move to next pane (varies by app)',
  'shift+f7': 'Spell check (varies by app)',
  'shift+f8': 'Extend selection mode (varies by app)',
  'shift+f9': 'Recalculate workbook (varies by app)',
  'shift+f11': 'Insert new worksheet (varies by app)',
  'shift+f12': 'Save As (varies by app)',
  'shift+tab': 'Move to previous field or outdent',
  'ctrl+tab': 'Next tab',
  'ctrl+shift+tab': 'Previous tab',
  'alt+tab': 'Switch between open windows',
  'alt+shift+tab': 'Switch windows in reverse order',
  'alt+f4': 'Close active window',
  'ctrl+shift+esc': 'Open Task Manager',
  'ctrl+alt+del': 'Open security screen',
  'ctrl+shift+n': 'New incognito / InPrivate window',
  'ctrl+shift+t': 'Reopen closed tab',
  'ctrl+shift+delete': 'Open clear browsing data',
  'ctrl+enter': 'Add line break or submit (varies by app)',
  'shift+enter': 'Add line break without sending (varies by app)',
  'shift+insert': 'Paste',
  'ctrl+insert': 'Copy',
  'shift+delete': 'Cut or permanently delete (varies by app)',
  'ctrl+home': 'Go to start of document',
  'ctrl+end': 'Go to end of document',
  'ctrl+left arrow': 'Move cursor one word left',
  'ctrl+right arrow': 'Move cursor one word right',
  'ctrl+shift+left arrow': 'Select previous word',
  'ctrl+shift+right arrow': 'Select next word',
  'ctrl+up arrow': 'Scroll up one paragraph (varies by app)',
  'ctrl+down arrow': 'Scroll down one paragraph (varies by app)',
  'shift+home': 'Select to start of line',
  'shift+end': 'Select to end of line',
  'shift+up arrow': 'Select up one line',
  'shift+down arrow': 'Select down one line',
  'shift+left arrow': 'Select left one character',
  'shift+right arrow': 'Select right one character',
  'shift+page up': 'Select up one page',
  'shift+page down': 'Select down one page',
  'ctrl+backspace': 'Delete previous word',
  'ctrl+delete': 'Delete next word',
  'alt+enter': 'Open Properties or toggle full screen',
  'win+l': 'Lock the PC',
  'win+d': 'Show or hide desktop',
  'win+e': 'Open File Explorer',
  'win+r': 'Open Run dialog',
  'win+s': 'Open Search',
  'win+shift+s': 'Open Snipping Tool / screen snip',
  'win+prtscn': 'Save full-screen screenshot to Pictures',
  'alt+prtscn': 'Screenshot active window to clipboard',
};

for (const [shortcut, description] of Object.entries(EXTRA_SHORTCUTS)) {
  if (!SHORTCUT_DESCRIPTIONS.has(shortcut)) {
    SHORTCUT_DESCRIPTIONS.set(shortcut, description);
  }
}

const KEY_LABEL_ALIASES: Record<string, string[]> = {
  'Up Arrow': ['Arrow Up', 'ArrowUp'],
  'Down Arrow': ['Arrow Down', 'ArrowDown'],
  'Left Arrow': ['Arrow Left', 'ArrowLeft'],
  'Right Arrow': ['Arrow Right', 'ArrowRight'],
  'Page Up': ['PageUp', 'Pg Up'],
  'Page Down': ['PageDown', 'Pg Down'],
  'PrtScn': ['Print Screen', 'PrintScreen', 'PrtSc'],
  'Esc': ['Escape'],
  'Period': ['.'],
  'Comma': [','],
  'Plus': ['+'],
  'Minus': ['-'],
};

function lookupShortcutDescription(label: string): string | undefined {
  const direct = SHORTCUT_DESCRIPTIONS.get(normalizeShortcut(label));
  if (direct) return direct;

  const segments = label.split(' + ');
  const keyPart = segments[segments.length - 1];
  const modifierPart = segments.slice(0, -1).join(' + ');

  for (const alias of KEY_LABEL_ALIASES[keyPart] ?? []) {
    const candidate = modifierPart ? `${modifierPart} + ${alias}` : alias;
    const match = SHORTCUT_DESCRIPTIONS.get(normalizeShortcut(candidate));
    if (match) return match;
  }

  return undefined;
}

const MODIFIER_BUTTON_IDS = new Set([
  'shift-left',
  'shift-right',
  'ctrl-left',
  'ctrl-right',
  'alt-left',
  'alt-right',
  'windows-left',
  'windows-right',
  'fn',
]);

export function shouldShowShortcutToast(
  modifiers: KeyModifiers,
  buttonConfig: Pick<KeyboardButton, 'id' | 'primary' | 'secondary'>,
  numLock: boolean,
): boolean {
  if (MODIFIER_BUTTON_IDS.has(buttonConfig.id)) return false;
  const hasShortcutModifier =
    modifiers.ctrl || modifiers.alt || modifiers.meta || modifiers.fn;
  if (hasShortcutModifier) return true;

  if (!modifiers.shift) return false;

  const { primary, secondary } = resolveKeyFromConfig(buttonConfig, numLock);

  if (primary.length === 1 && /[a-zA-Z]/.test(primary)) {
    return false;
  }

  if (
    primary.length === 1 &&
    secondary.length === 1 &&
    !SPECIAL_KEYS.has(primary)
  ) {
    return false;
  }

  return true;
}

export function getShortcutToastInfo(
  modifiers: KeyModifiers,
  buttonConfig: Pick<KeyboardButton, 'id' | 'primary' | 'secondary'>,
  numLock: boolean,
): { title: string; description: string } {
  const { primary } = resolveKeyFromConfig(buttonConfig, numLock);
  const keyLabel = formatKeyLabel(primary);
  const title = buildShortcutLabel(modifiers, keyLabel, primary);
  const description =
    lookupShortcutDescription(title) ?? DEFAULT_UNUSED_DESCRIPTION;

  return { title, description };
}
