# Comfey Pokemon Battle Demo
A simple game to showcase state management using [Comfey](https://npm.io/package/comfey)
For details on rules go to rules section below, 

TLDR; in short, you need `Motivation` and `HP` to do a battle, both of which decreases as you battle.

Every 10 sec a `gift box` appears, which contains random amount of `Berries` and `Potions` which restore `Motivation` and `HP` respectively.

Every game lasts 40 sec.

## DEMO URL
https://comfey-pokemon-battle.anilmaharjan.com.np

## Rules

- Motivation:
  -- Cap: 100%
  -- Restored by using: Berries
  -- Determines XP that is gained after a battle
  -- More Motivation give more XP reward

- HP:
  -- Cap: 100%
  -- Restored by using: Potions
  -- You cant battle if your HP is 0.

- XP:
  -- No Cap
  -- Gained from battle.

- Raspberries:
  -- No Cap
  -- Can be gained from Gifts
  -- Restores Motivation
  -- Using Raspberries during 100% motivation have no effect.

- Potions:
  -- No Cap
  -- Can be gained from Gifts
  -- Restores HP
  -- Using Potions during 100% HP have no effect.

- Gifts:
  -- Replenishes 10 sec after used.
  -- Dont keep it waiting :)
  -- Raspberries and Potions can be gained by opening it.

- Battle:
  -- Requires more than 0% HP to battle.
  -- Expends HP and motivation every battle.
  -- More Motivation while battling, more XP gained.
  -- Battling during 0 motivation has no effect.

- Battery:
  -- Can run for 40s.
  -- Game is over once battery runs out.
  -- Change battery to start new game.
  -- High score will be tracked until you refresh the page.
