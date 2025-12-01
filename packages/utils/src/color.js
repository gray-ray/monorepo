/**
 * @description 默认颜色数组。生成指定长度的颜色数组， 并且可以生成对应的子颜色数组
 */

export const defaultColorArray = [
  'rgb(24,144,255)',
  'rgb(26,250,118)',
  'rgb(152,55,255)',
  'rgb(255,115,13)',
  'rgb(252,243,30)',
  'rgb(251,32,58)',
  'rgb(31,252,226)',
  'rgb(173,198,255)',
  'rgb(255,116,174)',
  'rgb(255,163,158)'
];

export function rgbToHsl(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  const rN = r / 255,
    gN = g / 255,
    bN = b / 255;
  const max = Math.max(rN, gN, bN),
    min = Math.min(rN, gN, bN);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rN:
        h = (gN - bN) / d + (gN < bN ? 6 : 0);
        break;
      case gN:
        h = (bN - rN) / d + 2;
        break;
      case bN:
        h = (rN - gN) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

export function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;
  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r},${g},${b})`;
}

export function getMainColors(count, baseColors) {
  if (count <= baseColors.length) return baseColors.slice(0, count);

  const res = [...baseColors];
  const need = count - res.length;
  for (let i = 0; i < need; i++) {
    const hue = (i * 137.508) % 360;
    res.push(hslToRgb(hue, 70, 55));
  }
  return res;
}

export function generateSubColors(mainColor, count) {
  const { h, s, l } = rgbToHsl(mainColor);
  const arr = [];
  for (let i = 1; i <= count; i++) {
    const newHue = (h + i * 10) % 360;
    const newL = Math.min(85, Math.max(25, l + i * 5));
    arr.push(hslToRgb(newHue, s, newL));
  }
  return arr;
}
