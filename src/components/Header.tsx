import React from "react"

export const Header = React.memo( function Header() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="mt-2 flex  justify-center items-center gap-40">
        <div className="cursor-pointer flex justify-center items-center w-10 h-10 lg:w-[50px] lg:h-[50px] rounded-xl border-2 border-transparent hover:border-blue-500 hover:bg-indigo-100">
          <img src="/question.svg" alt="" className="w-[23px] h-[23px]" />
        </div>

        <h1 className="font-[700] text-lg sm:text-3xl lg:text-[30px]">WORDLESS</h1>

        <div className="cursor-pointer flex justify-center items-center w-10 h-10 lg:w-[50px] lg:h-[50px] rounded-xl border-2 border-transparent hover:border-blue-500 hover:bg-indigo-100">
          <img src="/chart.svg" alt="" className="w-[23px] h-[23px]" />
        </div>


      </div>
      <div className="flex items-center justify-center w-[44%] h-[1px] bg-yellow-100"></div>
    </div>
  )
})