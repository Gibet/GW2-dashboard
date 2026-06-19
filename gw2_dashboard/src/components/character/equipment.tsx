import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import type { EquipmentType, GearSetType } from "../../utils/types/character";
import { useCharacter } from "../../contexts/characterContext";
import { getItems } from "../../utils/services/items";
import Item from "../items/item";

const Equipment = () => {
  const character = useCharacter();

  const equipmentIds = useMemo(
    () =>
      character?.data?.equipment
        ? Array.from(character?.data?.equipment.flatMap((gear) => gear.id))
        : [],
    [],
  );

  const {
    data: gear,
    isLoading: loadingGear,
    isError: isErrorGear,
    error: errorGear,
  } = useQuery({
    queryKey: ["equipment", equipmentIds.join(",")],
    queryFn: () => getItems(equipmentIds),
    enabled: !!character,
  });

  const characterGear = useMemo((): GearSetType => {
    if (!character?.data?.equipment || !gear) return {};

    return character.data.equipment.reduce((acc, equipment) => {
      const item = gear.find((item) => item.id === equipment.id);
      if (!item) return acc;

      const slotKey = equipment.slot as keyof GearSetType;
      acc[slotKey] = { gear: equipment, item };

      return acc;
    }, {} as GearSetType);
  }, [character?.data?.equipment, gear]);

  return (
    <div className="w-full overflow-auto">
      {loadingGear && <div>Loading Equipment...</div>}
      {isErrorGear && (
        <div className="text-red-500">Error: {errorGear?.message}</div>
      )}
      {characterGear && !loadingGear && (
        <div>
          <h2>Gear</h2>
          <div id="gear_view">
            <div id="main_gear" className="gap-2">
              <div id="armor_piece" className="flex flex-col items-center gap-2">
                <span>Armor</span>
                <div>
                  <Item item={characterGear.Helm?.item} />
                  <Item item={characterGear.Shoulders?.item} />
                  <Item item={characterGear.Coat?.item} />
                  <Item item={characterGear.Gloves?.item} />
                  <Item item={characterGear.Leggings?.item} />
                  <Item item={characterGear.Boots?.item} />
                </div>
              </div>
              <div id="land_weapons_set" className="flex flex-col items-center gap-2">
                Weapons
                <div id="set_1">
                  <span>Set 1</span>
                  <Item item={characterGear.WeaponA1?.item} />
                  <Item item={characterGear.WeaponA2?.item} />
                </div>
                <div id="set_2">
                  <span>Set 2</span>
                  <Item item={characterGear.WeaponB1?.item} />
                  <Item item={characterGear.WeaponB2?.item} />
                </div>
              </div>
            </div>
            <div id="secondary_gear">
              {/* {attributes && <div id="stat_view">
                      <h3>Stats</h3>
                      {Object.keys(attributes).map((attribute, index) => {
                          return <div key={index}>
                              {primaryAttributes[attribute]}: {attributes[attribute]}
                          </div>
                      })}
                  </div>} */}
              <div id="trinkets" className="items-center gap-2">
                <span>Trinkets</span>
                <div className="flex flex-col items-center">
                  <div>
                    <Item item={characterGear.Backpack?.item} />
                    <div id="accesory">
                      <Item item={characterGear.Accessory1?.item} />
                      <Item item={characterGear.Accessory2?.item} />
                    </div>
                    <Item item={characterGear.Relic?.item} />
                  </div>
                  <div>
                    <Item item={characterGear.Amulet?.item} />
                    <div id="rings">
                      <Item item={characterGear.Ring1?.item} />
                      <Item item={characterGear.Ring2?.item} />
                    </div>
                  </div>
                </div>
                Underwater
                <div id="underwater_gear">
                  <div>
                    <Item item={characterGear.HelmAquatic?.item} />
                    <Item item={characterGear.WeaponAquaticA?.item} />
                    <Item item={characterGear.WeaponAquaticB?.item} />
                  </div>
                </div>
                Gathering tools
                <div id="gathering_tools">
                  <div>
                    <Item item={characterGear.Sickle?.item} />
                    <Item item={characterGear.Axe?.item} />
                    <Item item={characterGear.Pick?.item} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
