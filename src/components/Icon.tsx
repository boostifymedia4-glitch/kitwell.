import {
  ArrowDown, ArrowDownUp, ArrowLeft, ArrowRight, ArrowUp, BadgeCheck, Binary, Braces, CaseSensitive, Check, ChevronRight,
  CircleAlert, CircleCheck, Clock, Code, Copy, Crop, Diff, Download, Eraser, Eye, FileCode, FileImage, FileOutput,
  FileText, Fingerprint, FlipHorizontal, Hash, Heading, Image as ImageIcon, Info, KeyRound, Link, ListX, Lock, Menu,
  Merge, Minimize2, Palette, Pipette, Plus, Regex, Repeat, RotateCcw, RotateCw, Scaling, Search, ShieldCheck, Split,
  Terminal, Text, Trash2, Stamp, LockOpen, Pencil, Maximize2, EyeOff, ScanQrCode, QrCode, ChevronDown, LayoutGrid, ListOrdered, Shrink, TriangleAlert, UploadCloud, X, Zap, ZoomIn, ZoomOut, Layers, Globe, Sparkles,
  FileArchive, Mail, Send, BookOpen, ScanText, Signature, TextCursorInput, GitCompare, Film, SlidersHorizontal, RectangleHorizontal,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  'arrow-down': ArrowDown, 'arrow-down-up': ArrowDownUp, 'arrow-left': ArrowLeft, 'arrow-right': ArrowRight, 'arrow-up': ArrowUp,
  'badge-check': BadgeCheck, binary: Binary, braces: Braces, case: CaseSensitive, check: Check, 'chevron-right': ChevronRight,
  alert: CircleAlert, 'check-circle': CircleCheck, clock: Clock, code: Code, copy: Copy, crop: Crop, diff: Diff,
  download: Download, eraser: Eraser, eye: Eye, 'file-code': FileCode, 'file-image': FileImage, 'file-output': FileOutput,
  'file-text': FileText, fingerprint: Fingerprint, flip: FlipHorizontal, hash: Hash, markdown: Heading, image: ImageIcon,
  info: Info, key: KeyRound, link: Link, 'list-x': ListX, lock: Lock, menu: Menu, merge: Merge, minimize: Minimize2,
  palette: Palette, pipette: Pipette, plus: Plus, regex: Regex, repeat: Repeat, 'rotate-ccw': RotateCcw, rotate: RotateCw,
  scaling: Scaling, search: Search, shield: ShieldCheck, split: Split, terminal: Terminal, text: Text, trash: Trash2,
  warning: TriangleAlert, upload: UploadCloud, x: X, zap: Zap, 'zoom-in': ZoomIn, 'zoom-out': ZoomOut, layers: Layers,
  globe: Globe, sparkles: Sparkles, 'chevron-down': ChevronDown, grid: LayoutGrid, 'list-ordered': ListOrdered, shrink: Shrink,
  stamp: Stamp, 'lock-open': LockOpen, pencil: Pencil, maximize: Maximize2, 'eye-off': EyeOff, scan: ScanQrCode, 'qr-code': QrCode,
  'file-archive': FileArchive, 'scan-text': ScanText, signature: Signature, 'text-cursor': TextCursorInput, 'git-compare': GitCompare,
  mail: Mail, send: Send, book: BookOpen, film: Film, sliders: SlidersHorizontal, redact: RectangleHorizontal,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const hasIcon = (name: string) => name in icons;

export function Icon({ name, size = 20, className }: IconProps) {
  const Cmp = icons[name] ?? FileText;
  return <Cmp size={size} strokeWidth={1.9} aria-hidden="true" focusable="false" className={className} />;
}
