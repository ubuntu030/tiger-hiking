const theme = {
  // Primary button styles
  primary: "bg-[#2C5E1A]",
  primaryHover: "hover:bg-[#6B8E23]",

  // Secondary button styles
  secondary: "bg-white text-[#333333] border border-stone-300",
  secondaryHover: "hover:bg-stone-100",

  // Ghost button styles
  ghost: "bg-transparent text-[#333333]",
  ghostHover: "hover:bg-stone-100 hover:text-stone-800",

  // Danger button styles
  danger: "bg-[#D97706] text-white", // 使用橘色作為背景，並搭配白色文字
  dangerHover: "hover:bg-[#a85e05]", // hover 時顏色更深一點，增加視覺回饋

  background: "bg-[#F5F5F5]/10 backdrop-blur-sm",
  textPrimary: "text-[#333333]",
  textSecondary: "text-stone-600",
  accent: "text-[#D97706]",
  border: "border-stone-300",
  cardBg: "bg-white/80 backdrop-blur-md",
  inputBg: "bg-stone-50/80",
  focusRing: "focus:border-[#2C5E1A]",
};
export default theme;
