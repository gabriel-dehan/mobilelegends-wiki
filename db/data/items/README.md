# Structure

```js
{
  "name": "Tough Boots",
  "tier": 2,
  "price": 890,
  "category": "movement",
  "components": [ "boots", "magic_resist_cloak" ],
  "properties": [
    {
      "type": "Magic Resistance",
      "value": 22, // Could be negative
      "modifier": false // Is percentage (%)
    }
  ],
  "effects": [
    {
      "name": null, // Optional
      "effect": "+50 Movement Speed",
      "unique": true,
      "passive": false
    },
    {
      "name": "Fortitude",
      "effect": "25% Increased Resilience",
      "unique": true,
      "passive": true
    }
  ]
}
```
