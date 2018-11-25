export interface Item {
    origin: string;
    angle?: string;
    gametype?: string;
    // if set to 1, don't spawn in free for all games
    notfree?: string;
    // if set to 1, don't spawn in team games
    notteam?: string;
    // if set to 1, don't spawn in single player games
    notsingle?: string;
    // override the default wait before respawning.  -1 = never respawn automatically, which can be used with targeted spawning.
    wait?: string;
    // random number of plus or minus seconds varied from the respawn time
    random?: string;
    // override quantity or duration on most items.
    count?: string;
}

export const ItemNames = {
    ammo_belt: 'Chaingun Belt',
    ammo_bfg: 'Bfg Ammo',
    ammo_bullets: 'Bullets',
    ammo_cells: 'Cells',
    ammo_grenades: 'Grenades',
    ammo_lightning: 'Lightning',
    ammo_mines: 'Proximity Mines',
    ammo_nails: 'Nails',
    ammo_rockets: 'Rockets',
    ammo_shells: 'Shells',
    ammo_slugs: 'Slugs',
    holdable_invulnerability: 'Invulnerability',
    holdable_kamikaze: 'Kamikaze',
    holdable_medkit: 'Medkit',
    holdable_portal: 'Portal',
    holdable_teleporter: 'Personal Teleporter',
    item_ammoregen: 'Ammo Regen',
    item_armor_body: 'Heavy Armor',
    item_armor_combat: 'Armor',
    item_armor_shard: 'Armor Shard',
    item_bluecube: 'Blue Cube',
    item_doubler: 'Doubler',
    item_enviro: 'Battle Suit',
    item_flight: 'Flight',
    item_guard: 'Guard',
    item_haste: 'Speed',
    item_health: '25 Health',
    item_health_large: '50 Health',
    item_health_mega: 'Mega Health',
    item_health_small: '5 Health',
    item_invis: 'Invisibility',
    item_quad: 'Quad Damage',
    item_redcube: 'Red Cube',
    item_regen: 'Regeneration',
    item_scout: 'Scout',
    team_CTF_blueflag: 'Blue Flag',
    team_CTF_neutralflag: 'Neutral Flag',
    team_CTF_redflag: 'Red Flag',
    team_DD_pointAblue: 'Point A (Blue)',
    team_DD_pointAred: 'Point A (Red)',
    team_DD_pointAwhite: 'Point A (White)',
    team_DD_pointBblue: 'Point B (Blue)',
    team_DD_pointBred: 'Point B (Red)',
    team_DD_pointBwhite: 'Point B (White)',
    team_dom_pointBlue: 'Blue domination point',
    team_dom_pointRed: 'Red domination point',
    team_dom_pointWhite: 'Neutral domination point',
    weapon_bfg: 'BFG10K',
    weapon_chaingun: 'Chaingun',
    weapon_gauntlet: 'Gauntlet',
    weapon_grapplinghook: 'Grappling Hook',
    weapon_grenadelauncher: 'Grenade Launcher',
    weapon_lightning: 'Lightning Gun',
    weapon_machinegun: 'Machinegun',
    weapon_nailgun: 'Nailgun',
    weapon_plasmagun: 'Plasma Gun',
    weapon_prox_launcher: 'Prox Launcher',
    weapon_railgun: 'Railgun',
    weapon_rocketlauncher: 'Rocket Launcher',
    weapon_shotgun: 'Shotgun'
};

export interface Entities {
    target_position?: {
        targetname: string;
        origin: string;
    }[];
    // The info_player_deathmatch entity is used to define the respawn points used in deathmatch mode
    info_player_deathmatch?: {
        origin: string;
        angle?: string;
        notteam?: string;
    }[];
    // The info_player_intermission entity comes into effect when you go into the spectator mode. The first image you 
    // will see is the one you define via the intermission. Also the podium in single player matches or the final scores 
    // in multiplayer matches are shown in front of the defined view.
    info_player_intermission?: {
        // 3 numbers seperated by space
        origin: string,
        // 3 numbers seperated by space
        angles?: string,
        // look at this target?
        target?: string;
    }[];
    // The nearest target location to the player is the player location
    target_location?: {
        // the name of this target
        targetname: string,
        // 3 numbers seperated by space
        origin: string,
    }[];

    // items
    ammo_belt?: Item[];
    ammo_bfg?: Item[];
    ammo_bullets?: Item[];
    ammo_cells?: Item[];
    ammo_grenades?: Item[];
    ammo_lightning?: Item[];
    ammo_mines?: Item[];
    ammo_nails?: Item[];
    ammo_rockets?: Item[];
    ammo_shells?: Item[];
    ammo_slugs?: Item[];
    holdable_invulnerability?: Item[];
    holdable_kamikaze?: Item[];
    holdable_medkit?: Item[];
    holdable_portal?: Item[];
    holdable_teleporter?: Item[];
    item_ammoregen?: Item[];
    item_armor_body?: Item[];
    item_armor_combat?: Item[];
    item_armor_shard?: Item[];
    item_bluecube?: Item[];
    item_doubler?: Item[];
    item_enviro?: Item[];
    item_flight?: Item[];
    item_guard?: Item[];
    item_haste?: Item[];
    item_health?: Item[];
    item_health_large?: Item[];
    item_health_mega?: Item[];
    item_health_small?: Item[];
    item_invis?: Item[];
    item_quad?: Item[];
    item_redcube?: Item[];
    item_regen?: Item[];
    item_scout?: Item[];
    team_CTF_blueflag?: Item[];
    team_CTF_neutralflag?: Item[];
    team_CTF_redflag?: Item[];
    team_DD_pointAblue?: Item[];
    team_DD_pointAred?: Item[];
    team_DD_pointAwhite?: Item[];
    team_DD_pointBblue?: Item[];
    team_DD_pointBred?: Item[];
    team_DD_pointBwhite?: Item[];
    team_dom_pointBlue?: Item[];
    team_dom_pointRed?: Item[];
    team_dom_pointWhite?: Item[];
    weapon_bfg?: Item[];
    weapon_chaingun?: Item[];
    weapon_gauntlet?: Item[];
    weapon_grapplinghook?: Item[];
    weapon_grenadelauncher?: Item[];
    weapon_lightning?: Item[];
    weapon_machinegun?: Item[];
    weapon_nailgun?: Item[];
    weapon_plasmagun?: Item[];
    weapon_prox_launcher?: Item[];
    weapon_railgun?: Item[];
    weapon_rocketlauncher?: Item[];
    weapon_shotgun?: Item[];
}