import Color from "@/enums/color";

export default function getClassFromColor(color: string, hover?: boolean): string {
  switch (color) {
    case Color.RED:
      return `bg-red-500 shadow-red-300 ${hover ? "hover:bg-red-600" : ""}`;
    case Color.GREEN:
      return `bg-green-400 shadow-green-300 ${hover ? "hover:bg-green-500" : ""}`;
    case Color.BLACK:
      return `bg-gray-900 shadow-gray-500 ${hover ? "hover:bg-black" : ""}`;
    default:
      return "";
  }
}
