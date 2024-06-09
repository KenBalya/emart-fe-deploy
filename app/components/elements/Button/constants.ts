type BTN_TYPE = {
    primary: string
    secondary: string
    tertiary: string
    danger: string
  }
  
  export const BTN_STYLE_TYPE: BTN_TYPE = {
    primary:
      'text-white bg-[#21BF73] hover:shadow-[0_4px_4px_#3252C3] active:bg-[#B0EACD]',
    secondary:
      'bg-transparent text-[#21BF73] font-bold border-2 border-orange hover:bg-[#21BF73] hover:text-white duration-200 active:bg-transparent active:text-[#21BF73] border-2 border-[#21BF73]',
    tertiary:
      'bg-transparent text-white font-bold hover:text-[#3252C3] duration-300',
    danger:
      'text-white bg-red-600 hover:bg-red-700 active:bg-red-800'
  }