"use client";

import { useState } from "react";
import {
    BakeryDining,
    BrunchDining,
    Cake,
    Coffee,
    DinnerDining,
    EmojiFoodBeverage,
    Fastfood,
    Icecream,
    LocalBar,
    LocalCafe,
    LocalDining,
    LocalPizza,
    LunchDining,
    Nightlife,
    RamenDining,
    Restaurant,
    SetMeal,
    SoupKitchen,
    TakeoutDining,
    WineBar,
    Egg,
    KebabDining,
    RiceBowl,
    OutdoorGrill,
    BreakfastDining,
    Liquor,
    IcecreamTwoTone,
    NoFood,
    IceSkating,
    IcecreamOutlined,
    IcecreamRounded,
    Tapas,
    IcecreamSharp,
    EmojiFoodBeverageOutlined,
    LunchDiningOutlined,
    BrunchDiningOutlined,
    CoffeeMaker,
    Blender,
    Kitchen,
    Dining,
    RestaurantMenu,
    // Nutrition,
    EmojiFoodBeverageTwoTone,
    RamenDiningOutlined,
    CoffeeOutlined,
    FastfoodOutlined,
    BrunchDiningSharp,
    EmojiFoodBeverageRounded,
  } from "@mui/icons-material";
  
  const foodIcons = [
    { name: "BakeryDining", Icon: BakeryDining },
    { name: "BrunchDining", Icon: BrunchDining },
    { name: "Cake", Icon: Cake },
    { name: "Coffee", Icon: Coffee },
    { name: "DinnerDining", Icon: DinnerDining },
    { name: "EmojiFoodBeverage", Icon: EmojiFoodBeverage },
    { name: "Fastfood", Icon: Fastfood },
    { name: "Icecream", Icon: Icecream },
    { name: "LocalBar", Icon: LocalBar },
    { name: "LocalCafe", Icon: LocalCafe },
    { name: "LocalDining", Icon: LocalDining },
    { name: "LocalPizza", Icon: LocalPizza },
    { name: "LunchDining", Icon: LunchDining },
    { name: "Nightlife", Icon: Nightlife },
    { name: "RamenDining", Icon: RamenDining },
    { name: "Restaurant", Icon: Restaurant },
    { name: "SetMeal", Icon: SetMeal },
    { name: "SoupKitchen", Icon: SoupKitchen },
    { name: "TakeoutDining", Icon: TakeoutDining },
    { name: "WineBar", Icon: WineBar },
    { name: "Egg", Icon: Egg },
    { name: "KebabDining", Icon: KebabDining },
    { name: "RiceBowl", Icon: RiceBowl },
    { name: "OutdoorGrill", Icon: OutdoorGrill },
    { name: "BreakfastDining", Icon: BreakfastDining },
    { name: "Liquor", Icon: Liquor },
    { name: "IcecreamTwoTone", Icon: IcecreamTwoTone },
    { name: "NoFood", Icon: NoFood },
    { name: "IceSkating", Icon: IceSkating },
    { name: "IcecreamOutlined", Icon: IcecreamOutlined },
    { name: "IcecreamRounded", Icon: IcecreamRounded },
    { name: "Tapas", Icon: Tapas },
    { name: "IcecreamSharp", Icon: IcecreamSharp },
    { name: "EmojiFoodBeverageOutlined", Icon: EmojiFoodBeverageOutlined },
    { name: "LunchDiningOutlined", Icon: LunchDiningOutlined },
    { name: "BrunchDiningOutlined", Icon: BrunchDiningOutlined },
    { name: "CoffeeMaker", Icon: CoffeeMaker },
    { name: "Blender", Icon: Blender },
    { name: "Kitchen", Icon: Kitchen },
    { name: "Dining", Icon: Dining },
    { name: "RestaurantMenu", Icon: RestaurantMenu },
    // { name: "Nutrition", Icon: Nutrition },
    { name: "EmojiFoodBeverageTwoTone", Icon: EmojiFoodBeverageTwoTone },
    { name: "RamenDiningOutlined", Icon: RamenDiningOutlined },
    { name: "CoffeeOutlined", Icon: CoffeeOutlined },
    { name: "FastfoodOutlined", Icon: FastfoodOutlined },
    { name: "BrunchDiningSharp", Icon: BrunchDiningSharp },
    { name: "EmojiFoodBeverageRounded", Icon: EmojiFoodBeverageRounded },
  ];
  

export default function MaterialIconsList() {
  const [search, setSearch] = useState("");

  const filteredIcons = foodIcons.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Material Icons - Food & Beverage</h1>
      <input
        type="text"
        placeholder="Search icons..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-5 gap-4">
        {filteredIcons.map(({ name, Icon }) => (
          <div key={name} className="flex flex-col items-center p-2 border rounded-md">
            <Icon fontSize="large" />
            <span className="text-xs mt-1">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
