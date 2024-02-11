import { Color } from '@/enums/color';

export const classFromColor = (color: string, hover?: boolean): string => {
  switch (color) {
    case Color.RED:
      return `bg-red shadow-red-light ${hover ? 'hover:bg-red-dark' : ''}`;
    case Color.GREEN:
      return `bg-green shadow-green-light ${hover ? 'hover:bg-green-dark' : ''}`;
    case Color.BLACK:
      return `bg-black shadow-gray-500 ${hover ? 'hover:bg-black-dark' : ''}`;
    default:
      return '';
  }
};
