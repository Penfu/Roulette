import Color from "@/enums/color";

export default function getClassFromColor(color: string): string {
  switch (color) {
    case Color.RED:
      return 'bg-red-500 shadow-red-300';
    case Color.GREEN:
      return 'bg-green-500 shadow-green-300';
    case Color.BLACK:
      return "bg-gray-900 shadow-gray-500";
    default:
      return "";
  }
}
