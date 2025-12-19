#include <string>
#include <cmath>// pour pow() et floor()
#include <vector>
#include <iostream>
#include <vector>
#include <cstdlib>   // rand, srand
#include <ctime>     // time
#include <random>
#include "napi.h"// pour compatibilité Node.js


struct Classe {
    std::string nom;

    //stats classique
    float force;
    float def;
    float vit;
    float hp;

    //max stats
    float hp_max;

    //mana
    float mana;
    
    //stats spe
    float force_spe;
    float def_spe;
    
    //précision et res au effet
    float volonte;
    float concentration;
    
    //taux critique et dgt cirtique
    float tc;
    float dc;
    
    //mana
    float maitrise;
    float intensite;
    
    //taux d'esquive
    float taux_esquive;

    //pour passif
    bool criticalHit;       // pour vérifier les critiques si réussi
    bool targetHit;         // pour passif
};

// ------------------------------------------------------- Vassals --------------------------------------------------------
Classe VD  = {"Vassal de la Destruction", 4000, 3800, 4200, 5000, 5000, 20000, 8500, 3000, 70, 150, 70, 150, 9000, 0};
Classe VS  = {"Vassal des Ombres", 3300, 4900, 4000, 4600, 4600, 16000, 9000, 3400, 75, 140, 75, 140, 8500, 0};
Classe VW  = {"Vassal des Flammes Blanches", 3500, 3700, 3900, 4200, 4200, 18000, 9500, 4000, 80, 160, 80, 160, 8700, 0};
Classe VG  = {"Vassal du Givre", 3700, 3500, 4000, 4100, 4100, 19000, 9700, 4200, 60, 155, 60, 155, 8800, 0};
Classe VC  = {"Vassal au Corps d'Acier", 5200, 2900, 4200, 5200, 5200, 25000, 8000, 2000, 55, 140, 55, 140, 8900, 0};
Classe VB  = {"Vassal du Commencement", 3600, 4000, 4100, 4400, 4400, 17500, 9200, 3500, 70, 150, 70, 150, 8700, 0};
Classe VF  = {"Vassal des Betes", 4500, 4800, 4300, 5700, 5700, 21000, 8500, 2600, 75, 145, 75, 145, 8600, 0};
Classe VT  = {"Vassal des Fleaux", 4000, 3700, 4000, 4000, 4000, 19000, 9600, 3800, 65, 150, 65, 150, 8700, 0};
Classe VTR = {"Vassal de la Transfiguration", 3700, 3600, 4200, 4200, 4200, 18000, 9300, 3700, 65, 155, 65, 155, 8800, 0};

// -------------------------------------------------------- Spéciaux --------------------------------------------------------------------------------------------
Classe SJW = {"Sung Jin-Woo", 2200, 4500, 2500, 4000, 4000, 15000, 5000, 4000, 70, 150, 70, 150, 8000, 0};
Classe IQ  = {"Ice Queen", 3700, 3600, 4200, 4200, 4200, 18000, 9300, 3700, 65, 155, 65, 155, 2000, 0};
Classe DL  = {"Devil Lord", 3700, 3600, 4200, 4200, 4200, 18000, 9300, 3700, 65, 155, 65, 155, 8800, 0};
Classe THO = {"The Honored One", 1500, 4000, 1500, 3200, 3200, 7600, 3000, 4000, 45, 130, 45, 130, 2000, 0};
Classe Vergil = {"Vergil",2200,4500,2500,3800,3800,15000,5000,4000,70,150,70,150,4500,0};
Classe Kirito = {"Kirito",1500,4200,2200,3500,3500,13000,4800,3800,65,140,65,140,4000,0};
Classe Madara = {"Ghost of the Uchiwa",2000,4000,5000,3700,3700,16000,12000,9000,80,160,80,160,7500,0};
Classe VA = {"Nightwalker",1800,3900,4800,3600,3600,14500,11000,8500,75,155,75,155,7200,0};
Classe Ichigo = {"Ichigo",2500,4300,4000,4000,4000,15500,9000,8000,70,145,70,145,6800,0};
Classe Aizen = {"Aizen",1800,3500,7000,3200,3200,14000,15000,12000,85,170,85,170,8500,0};
Classe Gilgamesh = {"Gilgamesh",2500,3600,5000,3800,3800,15000,14000,9000,75,160,75,160,8000,0};
Classe Anos = {"Anos",3000,4000,9000,4500,4500,20000,18000,15000,90,180,90,180,9000,0};
Classe Sephiroth = {"Sephiroth",2200,4200,5000,4000,4000,16000,12000,9500,80,160,80,160,8000,0};
Classe Dante = {"Dante",2100,4100,4800,3900,3900,15500,11000,9000,75,155,75,155,7500,0};
Classe EM_IN_SH = {"Cid Kagenou",1500,3500,3000,3000,3000,12000,8000,7000,60,140,60,140,6000,0};
Classe EM_IN_SH2 = {"Shadow", 1600, 3600, 3200, 3200, 3200, 12500, 8500, 7500, 62, 142, 62, 142, 6200,0};
Classe EM_IN_SH3 = {"John Smith",1550,3550,3100,3100,3100,12300,8300,7300,61,141,61,141,6100,0};

// -------------------------------------------------------- Boss "Monarch" ------------------------------------------------------
Classe Monarch_of_Destruction = {"Monarque de la Destruction", 70000, 85000, 140000, 125000, 125000, 2000000, 80000, 25000, 0, 0, 0, 0, 70000,0};
Classe Monarch_of_Shadow       = {"Monarque des Ombres", 50000, 130000, 170000, 110000, 110000, 1200000, 60000, 45000,0,0,0,0,60000,0};
Classe Monarch_of_WhiteFlame   = {"Monarque des Flammes Blanches", 55000, 60000, 150000, 65000, 65000, 1400000, 220000, 25000,0,0,0,0,120000,0};
Classe Monarch_of_Frost        = {"Monarque du Givre", 58000, 62000, 155000, 60000, 60000, 1500000, 230000, 26000,0,0,0,0,130000,0};
Classe Monarch_of_SteelBody    = {"Monarque au Corps d'Acier", 120000, 45000, 100000, 95000, 95000, 3500000, 50000, 10000,0,0,0,0,130000,0};
Classe Monarch_of_Beginning    = {"Monarque du Commencement", 65000, 70000, 160000, 70000, 70000, 1600000, 200000, 20000,0,0,0,0,100000,0};
Classe Monarch_of_Beasts       = {"Monarque des Betes", 80000, 100000, 160000, 130000, 130000, 2200000, 60000, 22000,0,0,0,0,80000,0};
Classe Monarch_of_Plague       = {"Monarque des Fleaux", 70000, 80000, 120000, 60000, 60000, 1800000, 150000, 20000,0,0,0,0,90000,0};
Classe Monarch_of_Transfig     = {"Monarque de la Transfiguration", 55000, 65000, 130000, 50000, 50000, 1600000, 150000, 20000,0,0,0,0,110000,0};

// Variable globale pour stocker tous les mobs
struct Mob {
    std::string nom;
    float hp;
    float mana;
    float intensite;
    float force;
    float def;
    float vit;
    float force_spe;
    float def_spe;
    float volonte;
    float concentration;
    float tc;
    float dc;
    float maitrise;
    float taux_esquive;
    int niveau;
};

Classe ennemi("Gobelin", 500, 200, 100, 1000, 50, 30, 20, 10, 10, 5, 5, 0, 0, 2);

//-------------------------------------------------------------------------------------famillier-------------------------------------------------------------------------------------------------------------------
struct Familier{
    std::string nom;
    float hp;
    float mana;
    float intensite;
    std::vector<std::string> compétences;
    float force;
    bool can_hit = false;
    bool immuneToDebuff = true;
};


Familier Alpha("Alpha", 3200, 1600, 3600, {"Boost alliés"}, false, true);
Familier Beta("Beta", 3100, 1550, 3550, {"debuff"}, false, true);
Familier Gamma("Gamma", 3300, 1650, 3700, {"offensive"}, false, true);
Familier Delta("Delta", 3000, 1500, 3400, {"attaque surprise"}, true, true);
Familier Epsilon("Epsilon", 3050, 1520, 3450, {"Soins alliés"}, false, true);
Familier Zeta("Zeta", 3150, 1580, 3500, {"attaque de suivi"}, true, true);
Familier Eta("Eta", 3250, 1620, 3550, {"Analyse adaptative"}, false, true );

Familier IllusionO("illusion offensive", 3000, 2000, 3400, {"attaque"}, true, false);
Familier IllusionD("illusion defensive", 3000, 1500, 3400, {"immune"}, false, false);
//-----------------------------------------------------------------------------------passif familier---------------------------------------------------------------------------------------------
//passif Alpha
//buff ally
void alphabuff(Familier &Alpha, Classe &Ally, bool alive){
    Ally.force         += Ally.force * 0.20f;
    Ally.def           += Ally.def * 0.20f;
    Ally.vit           += Ally.vit * 0.20f;
    Ally.force_spe     += Ally.force_spe * 0.20f;
    Ally.def_spe       += Ally.def_spe * 0.20f;
    Ally.volonte       += Ally.volonte * 0.20f;
    Ally.tc            += Ally.tc * 0.20f;
    Ally.dc            += Ally.dc * 0.20f;
}

//passif Beta
//debuff
void betanullify(Familier &Beta, Classe &enemy){
    enemy.force       = enemy.force;       // à remplacer par valeur de base si tu la stockes
    enemy.def         = enemy.def;
    enemy.vit         = enemy.vit;
    enemy.force_spe   = enemy.force_spe;
    enemy.def_spe     = enemy.def_spe;
    enemy.volonte     = enemy.volonte;
    enemy.concentration = enemy.concentration;
    enemy.tc          = enemy.tc;
    enemy.dc          = enemy.dc;
}

//passif Gamma
//offensive
void gammaoffensive(Familier &Gamma, Classe &Ally){
    // Vérifie si l'ennemi est en dessous de 50% de ses HP max
    if (ennemi.hp < ennemi.max_hp * 0.50f){
        // Réduit la défense physique et magique de l'ennemi de 85%
        ennemi.def       *= 0.15f;
        ennemi.def_spe   *= 0.15f;
    }
}

//Delta
//[nom de passif]
void Deltainfiltration(Familier &Delta, Classe &enemy) {
    Delta.force += Delta.force * 0.25f;
    // ignore 30% de la défense de la cible (pas encore add)
}


//passif Espilon
//soin allier
void epsilonsoin(Familier &Epsilon, Classe &Ally){
    Ally.hp += Ally.hp * 0.10f;
    //+20% auto 1 fois par combat si allier en dessou de 20% hp (pas encore add)
}

//passif zeta
//attaque de suivi
void zetafollowup(Familier &Zeta, Classe &Ally, Classe &enemy) {
    if (Ally.criticalHit) { // bool à définir dans Classe
        int degats = Ally.force * 0.50f;
        enemy.hp -= degats;
    }
}

//passif eta
//analyse adaptative
void etaanalysis(Familier &Eta, Classe &ally){
    ally.concentration += ally.concentration * 0.20f;
    ally.tc            += ally.tc * 0.20f;
}

//illusion offensive
void illusionoffensive(Familier &illusionO , Classe &enemy){
    // Inflige des dégâts égaux à la force de l'illusion
    float degats = illusionO.force;
    enemy.hp -= degats;

    illusionO.can_hit = false;
}


//illusion defensive
void illusiondefensive(Familier &illusionD, Classe &Madara){
 target.effets_actifs.push_back({"Immune", 1, 0.0f, 1.0f, 1.0f, false, 0, true});
    
    illusionD.can_hit = false;
}

//--------------------------------------------------------------------------------classes vassal--------------------------------------------------------------------------------------------------

//classes vassal (tous)


//--------------------------------------------------------------------------------classes spécial--------------------------------------------------------------------------------------------------------------
//classe ice queen

//volonté de glace
void volonteGlace(Classe &IQ){
    IQ.concentration += IQ.concentration * 1.00f;
}

//domination glaciale
void dominationGlaciale(Classe &IQ , std::vector<Classe> &entities){
 if (enemy.vit < IQ.vit - 0.70f){
        IQ.force      += IQ.force * 0.25f;
        IQ.force_spe  += IQ.force_spe * 0.25f;

        enemy.effets_actifs.push_back(Frostbite);
    }
}

//classe devil lord

// Passif Pression Dominatrice
void pressionDominatrice(Classe &DL, std::vector<Classe> &entities) {
    for (auto &entity : entities) {
        // n'affecte pas DL lui-même :
        if (&entity == &DL) continue;

        // condition : intensite inférieure de 2000
        if (entity.intensite < DL.intensite - 2000.0f) {
            entity.force         *= 0.55f; // équivalent à entity.force = entity.force * 0.55
            entity.def           *= 0.55f;
            entity.vit           *= 0.55f;
            entity.force_spe     *= 0.55f;
            entity.def_spe       *= 0.55f;
            entity.mana          *= 0.55f;
            entity.concentration *= 0.55f;
            entity.volonte       *= 0.55f;
            entity.tc            *= 0.55f;
            entity.dc            *= 0.55f;
            entity.maitrise      *= 0.65f; // -35%
        }
    }
};

//anticipation
//buff de def permanent
void anticipation (Classe &DL){
    DL.def    += DL.def * 0.30f;
    DL.def_spe+= DL.def_spe * 0.30f;
}

//demonic ruler authority
void demonicrulerauthority(Classe &DL, &TerrainType){
    if (bool actifturn = true)
    {
    1 =  None;
    2 = Nullify_Field; //applique les effet associer
    3 = Black_Thunder_Field;//applique les effet associer
    4 = Black_Flame_Field;//applique les effet associer
    5 = Demonic_Area;//applique les effet associer
     duration = until next turn
            random_device rd;
    mt19937 gen(rd());

    for (int i = 1; i < 5; ++i) {
        cout << gen() << " ";
    }
    cout << endl;
    
    }
}


//classe The Honored One
//purple revive
void revive(Classe &THO, bool &oncepercombat){
  if (THO.hp <= 0 && !oncePerCombat){
        // Génère un float aléatoire entre 0.01 et 0.10
        float random_float = static_cast<float>(rand()) / RAND_MAX * 0.09f + 0.01f;

        if (random_float <= 0.85f){ // 85% de chance
            // revient avec 20% de ses HP max
            THO.hp = THO.base_hp * 0.20f;
            oncePerCombat = true;

            // Inflige des dégâts à l'ennemi (2x force_spe)
            enemy.hp -= THO.force_spe * 2.0f;

            std::cout << THO.nom << " se relève avec Purple Dégâts infligés à " 
                      << enemy.nom << ": " << THO.force_spe * 2.0f << std::endl;
        }
    }
};

//infinty
void infinty(Classe &THO){
    THO.vit += THO.vit * 0.45f;
    THO.taux_esquive += THO.taux_esquive * 0.10f;
};

//classe Vergil



//classe kirito
//dual sword
void fluxininterompu(Classe &Kirito){
    if (targetHit){
        // Bonus de 5%
        Kirito.tc += 5.0f;

        // Limite le taux critique à 40%
        if (Kirito.tc > 40.0f){
            Kirito.tc = 40.0f;
        }
    }
};

void Danse_mortelle(Classe &Kirito, Classe &Enemy){
    if (Enemy.hp < Enemy.hp_max * 0.15f){
        Kirito.atk += Kirito.atk * 0.30f;
    }
};

//monosword
void critstreak(Classe &kirito){
    if (kirito.criticalhit*5 == true){
        kirito.dc += 130.0f;
    }
}


//classe ghost

//illusion
//fait apparaitre 2 illusions
void illusion(Classe &Madara, Familier &illusionO, Familier &illusionD){
    illusionO.can_hit = true;

    illusionD.immuneToDebuff = true;
}

//cycle de la haine
void hateCycle(Classe &Madara, std::vector<Classe> &allies, int &mark, const int max_mark = 5){
    for (auto &ally : allies){
        if (ally.hp <= 0){ // allié mort
            if (mark < max_mark){
                mark += 1;
                std::cout << Madara.nom << " gagne 1 cumul de Cycle de la Haine (total : " << mark << ")" << std::endl;
            }
        }
    }
}

//revive
// Passif Six Paths complet pour Madara
void sixPaths(Madara &madara, int mark, std::vector<Classe> &enemies, TerrainType &terrain, bool &oncePerCombat){
    const int max_mark = 5;

    // Vérifie que le mark est plein et que le passif n'a pas été utilisé
    if (mark >= max_mark && !oncePerCombat){
        oncePerCombat = true;

        // Si Madara est mort : revival
        if (madara.hp <= 0){
            madara.hp = madara.base_hp * 0.60f;
            madara.mana = madara.base_mana;

            // Tempête du Néant Divin
            for (auto &enemy : enemies){
                if (enemy.hp < enemy.base_hp * 0.30f){
                    enemy.hp = 0;
                    std::cout << enemy.nom << " est anéanti !" << std::endl;
                } else {
                    enemy.hp -= enemy.base_hp * 0.35f; // 35% dégâts purs
                    enemy.effets_actifs.push_back(Stun); // stun 1 tour
                    enemy.mana -= enemy.mana * 0.20f;    // -20% mana
            }
        }

        // Activation du Mode Six Paths (buffs et terrain)
        madara.modeSixPaths = true;
        madara.toursModeSixPaths = 3;           // 3 tours si revive, 2 sinon
        madara.force *= 1.35f;                  // +35% attaque
        madara.vit   *= 1.25f;                  // +25% vitesse
        madara.immuneToDeath = true;            // Immunité à la mort
        madara.typeAttaque = "Divin";           // Attaques divines
        terrain = TerrainType::oeil_lunaire_field; // Terrain spécial
    }

    // Régénération et gestion de la durée
    if (madara.modeSixPaths && madara.toursModeSixPaths > 0){
        madara.hp += madara.base_hp * 0.10f;
        madara.mana += madara.base_mana * 0.10f;
        madara.toursModeSixPaths--;
                  << madara.toursModeSixPaths << std::endl;
    }

    // Fin du Mode Six Paths
    if (madara.toursModeSixPaths == 0){
        madara.modeSixPaths = false;
        madara.typeAttaque = "Normal";
    }
}
}

//classe nightwalker

//classe ichigo

//classe aizen

//classe gilgamesh

//classe anos

//classe Sephiroth

//classe dante

//cid kagenou

//shadow
//shadow garden
void shadowGarden(Classe &Shadow, std::vector<Classe> &enemies, std::vector<Familier> &familiers, bool &summonActive);

// Mode global
enum class Mode { EM_IN_SH,EM_IN_SH2,EM_IN_SH3 };

// Activer Shadow Garden et les familiers
void shadowModeActive(Mode &currentMode, Classe &Shadow, std::vector<Familier> &familiers, std::vector<Classe> &enemies){
    if (currentMode == Mode::EM_IN_SH2){
        bool summonActive = false;
        shadowGarden(Shadow, enemies, familiers, summonActive);

        // Activer les familiers
        for (auto &f : familiers){
            if (f.nom == "Alpha" || f.nom == "Beta" || f.nom == "Gamma" || 
                f.nom == "Delta" || f.nom == "Epsilon" || f.nom == "Eta" || f.nom == "Zeta"){
                f.can_hit = true;
                std::cout << f.nom << " peut agir grâce à Shadow Garden." << std::endl;
            }
        }
    }
}

// Définition de la fonction shadowGarden
void shadowGarden(Classe &Shadow, std::vector<Classe> &enemies, std::vector<Familier> &familiers, bool &summonActive){
    if (!summonActive){
        summonActive = true;

        // Effets sur les ennemis
        for (auto &enemy : enemies){
            enemy.vit *= 0.85f;
            enemy.def *= 0.90f;
        }
    }
}

//john smith

//------------------------------------------------------------------------------classe verouiller------------------------------------------------------------------------------------------------------------

//#####

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------calculs-----------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------rank et rareter--------------------------------------------------------------------------------------------------------------------------
struct Rank {
    char E;
    char D;
    char C;
    char B;
    char A;
    char S;
    char Nation;
};

struct Rarity {
    char E;
    char D;
    char C;
    char B;
    char A;
    char S;
    char SS;
    char SSR;
    char Dev; //seul le developpeur peut les avoir ou donner
};

//----------------------------------------------------------------------------------------type d'équipement et set----------------------------------------------------------------------------------------

struct équipement {
    char casque;
    char plastron;
    char gants;
    char jambière;
    char bottes;
    char lance;
    char dague;
    char catalyst;
    char bouclier;
    char arc;
    char baton_de_mage;
    char sword;
    char broadsword;
    char scythe;
};

struct set {
    char from_the_heaven_to_hell;
    //char
    //char
    //char
    //char
    //char
};
//------------------------------------------------------------------------------------------effet de status-------------------------------------------------------------------------------------------

struct EffetStatus {
    std::string nom;
    int duree;           // nombre de tours
    float degats;        // dégâts par tour si applicable
    float modDefense;    // multiplicateur défense (1 = normal, 0.8 = -20%)
    float modVitesse;    // multiplicateur vitesse
    bool bloqueAction;   // true si l’effet empêche d’agir
    float debuff;        //multiplicateur de debuff (0 si aucun)
    bool nullify;       //nullify
};

EffetStatus Nullify      = {"Nullify", 1, 0, 1.0f, 1.0f, false, 1, true}; 
// Annule les buffs/debuffs

EffetStatus Black_Thunder= {"Black Thunder", 1, 500, 1.0f, 1.0f, true, 1, false};
// Dégâts immédiats très élevés et skip 1 tour

EffetStatus Black_Flame  = {"Black Flame", 3, 300, 1.0f, 1.0f, false, 1, false}; 
// Dégâts immédiats très élevés

EffetStatus Frostbite     = {"Frostbite", 1, 0, 1.0f, 0.0f, true, 1, false}; 
// Gèle 1 tour : bloque l’action, vitesse à 0

EffetStatus Desagregation= {"Desagregation", 3, 300, 1.0f, 1.0f, false, 1, false}; 
// Dégâts magiques sur 3 tours

EffetStatus Laceration    = {"Laceration", 3, 200, 1.0f, 1.0f, false, 1, false}; 
// Dégâts physiques sur 3 tours

EffetStatus Faiblesse     = {"Faiblesse", 3, 0, 0.8f, 0.8f, false, 1, false}; 
// Défense et vitesse -20% pendant 3 tours

EffetStatus Stun      = {"Stun", 1, 0, 1.0f, 1.0f, true, 1, false}; 
// Empêche d’agir pendant 1 tour

//------------------------------------------------------------------------------------------types de dégats----------------------------------------------------------------------------------------------------------------------------------------
struct damage_element
{
    char physical;//x1
    char magical;//x1

    //classique
    char elecrical;
    char fire;
    char ice;

    //avancée
    char Void;
    char Demonic;
    char divine;

    //supérieur a tous
    char anihilate;

    //special
    char Divine;
    char Pur_Damage;
};

//------------------------------------------------------------------------------------------effet de terrain-------------------------------------------------------------------------------------

enum class TerrainType {
    None,               // Aucun effet
    Nullify_Field,      // Annule les effets de statut
    Black_Thunder_Field,// Applique le tonnerre noir
    Black_Flame_Field,  // Applique la flamme noire
    Demonic_Area,       // Combine tous les effets (Nullify + Black Thunder + Black Flame)
    oeil_lunaire_field  // reduits buff et impossibiliter de soin.
};
//----------------------------------------------------------------------------------passif des arme, équipement-------------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------type d'arme----------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------effet de set----------------------------------------------------------------------------------------------------------------------------------------------------
if (character.equipement == set.from_the_heaven_to_hell == *2){
    void From_heaven_to_hell_2P(Classe &character){
        character.damage_element.divine=true;
        for (character.atk == true )
        {
            if (random_float <= 0.35f){
                enemy.hp -= character.force * 0.50f;
                std::cout << character.nom << "une épée divine tombe du ciel et inflige des dégats à "
                          << enemy.nom << ": " << character.force * 0.50f << std::endl;
            }
        }
    }
}

if (character.equipement == set.from_the_heaven_to_hell == *4){
    void FromHeavenToHell4P(Classe &character){
        character.damage_element.divine=true;
        for (character.atk == true)
        {
            enemy.status += EffetStatus Black_Flame;
        }
    }
}

//------------------------------------------------------------------------------------------boost de rank---------------------------------------------------------------------------------------------------------------
