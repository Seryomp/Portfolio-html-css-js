#include <string>
#include <cmath>// pour pow() et floor()
#include <vector>
#include <iostream>
#include <vector>
#include "napi.h"// pour compatibilité Node.js
using namespace std;

//structure pour pouvoir attribuer les stats et nom au classes
struct Classe {
    std::string nom;

    //Statistiques physiques
    int force;// Attaque physique
    int def;// Défense physique
    int vit;// Vitesse d’action
    int hp;// Points de vie

    //Statistiques magiques
    int mana;// Reserve magique
    int force_spe;// Attaque magique
    int def_spe;// Défense magique

    //Precision et resistance mentale
    int volonte;// Resistance aux effets
    int concentration;// Precision des sorts

    //Statistiques critiques
    int tc;// Taux critique (%)
    int dc;// Dégâts critiques (%)

    //Énergie spirituelle
    int maitrise;// Contrôle du mana (stabilité et canalisation)
    int intensite;// mana

    string type;    // "spéciale", "vassal", "classique", "mob"
    bool isPlayer;  // true si c'est un joueur, false si c'est un mob
};




//Classes de base (niv1)
Classe Tank        = {"Tank", 60, 120, 45, 350, 250, 10, 100, 55, 70, 170, 80, 100};

Classe Assassin    = {"Assassin", 110, 50, 130, 120, 260, 45, 170, 90, 100, 90, 100, 80};

Classe Soutien     = {"Soutien", 60, 70, 70, 180, 300, 15, 110, 120, 120, 60, 120, 90};

Classe Soigneur    = {"Soigneur", 50, 55, 65, 160, 350, 20, 105, 130, 140, 50, 130, 100};

Classe Attaquant   = {"Attaquant", 125, 70, 85, 200, 280, 40, 140, 130, 110, 70, 130, 100};

Classe Mage        = {"Mage", 65, 55, 60, 140, 420, 25, 150, 200, 160, 40, 150, 130};

Classe Invoquateur = {"Invoquateur", 70, 65, 70, 160, 400, 20, 130, 160, 140, 40, 160, 120};




//Classes Vassal (niveau 5000)
Classe VD = {"Vassal de la Destruction", 5000, 4000, 3800, 20000, 8500, 3000, 4200, 2800, 2600, 70, 150, 9000};

Classe VS = {"Vassal des Ombres", 4600, 3300, 4900, 16000, 9000, 3400, 4000, 3200, 3100, 75, 140, 8500};

Classe VW = {"Vassal des Flammes Blanches", 4200, 3500, 3700, 18000, 9500, 4000, 3900, 3300, 3200, 80, 160, 8700};

Classe VG = {"Vassal du Givre", 4100, 3700, 3500, 19000, 9700, 4200, 4000, 3100, 3300, 60, 155, 8800};

Classe VC = {"Vassal au Corps d'Acier", 5200, 5200, 2900, 25000, 8000, 2000, 4200, 2800, 2800, 55, 140, 8900};

Classe VB = {"Vassal du Commencement", 4400, 3600, 4000, 17500, 9200, 3500, 4100, 3100, 3000, 70, 150, 8700};

Classe VF = {"Vassal des Betes", 5700, 4500, 4800, 21000, 8500, 2600, 4300, 3000, 2700, 75, 145, 8600};

Classe VT = {"Vassal des Fleaux", 4000, 4000, 3700, 19000, 9600, 3800, 4000, 3000, 3100, 65, 150, 8700};

Classe VTR = {"Vassal de la Transfiguration", 4200, 3700, 3600, 18000, 9300, 3700, 4200, 3400, 3200, 65, 155, 8800};



//classe "special"

// Passif Esdeath : "Domination Glaciale"
// Gèle tout adversaire dont la vitesse est inférieure de 30% à la sienne pendant 2 tours et augmente sa force de 20% si aucun allié n'est présent sur le terrain

Classe DL = {"Devil Lord",4200, 3700, 3600, 18000, 9300, 3700, 4200, 3400, 3200, 65, 155, 8800};
                                                         //CE
Classe THO = {"The Honored One", 3200, 1500, 4000, 7600, 3000, 4000, 1500, 2000, 1500, 45, 130, 155, 2000};

Classe Vergil = {"Vergil",3800,2200,4500,15000,5000,4000,2500,70,150,8000,65,5000,4500};

Classe Kirito = {"Kirito",3500,1500,4200,13000,4800,3800,2200,65,140,7500,60,4500,4000};

Classe Madara = {"Madara",3700,2000,4000,16000,12000,9000,5000,80,160,9000,70,8000,7500};

Classe Sasuke = {"Sasuke",3600,1800,3900,14500,11000,8500,4800,75,155,8500,68,7500,7200};

Classe Ichigo = {"Ichigo",4000,2500,4300,15500,9000,8000,4000,70,145,8000,65,7000,6800};

Classe Aizen = {"Aizen",3200,1800,3500,14000,15000,12000,7000,85,170,9500,80,9000,8500};

Classe Gilgamesh = {"Gilgamesh",3800,2500,3600,15000,14000,9000,5000,75,160,8800,70,8500,8000};

Classe Anos = {"Anos",4500,3000,4000,20000,18000,15000,9000,90,180,10000,85,9500,9000};

Classe Sephiroth = {"Sephiroth",4000,2200,4200,16000,12000,9500,5000,80,160,9000,75,8500,8000};

Classe Dante = {"Dante",3900,2100,4100,15500,11000,9000,4800,75,155,8500,70,8000,7500};

//stats des boss "monarch"

Classe Monarch_of_Destruction = {"Monarque de la Destruction", 125000, 70000, 85000, 2000000, 80000, 25000, 140000, 130000, 70000};

Classe Monarch_of_Shadow       = {"Monarque des Ombres", 110000, 50000, 130000, 1200000, 60000, 45000, 170000, 90000, 60000};

Classe Monarch_of_WhiteFlame   = {"Monarque des Flammes Blanches", 65000, 55000, 60000, 1400000, 220000, 25000, 150000, 180000, 120000};

Classe Monarch_of_Frost        = {"Monarque du Givre", 60000, 58000, 62000, 1500000, 230000, 26000, 155000, 185000, 130000};

Classe Monarch_of_SteelBody    = {"Monarque au Corps d'Acier", 95000, 120000, 45000, 3500000, 50000, 10000, 100000, 55000, 130000};

Classe Monarch_of_Beginning    = {"Monarque du Commencement", 70000, 65000, 70000, 1600000, 200000, 20000, 130000, 160000, 100000};

Classe Monarch_of_Beasts        = {"Monarque des Betes", 130000, 80000, 100000, 2200000, 60000, 22000, 160000, 140000, 80000};

Classe Monarch_of_Plague       = {"Monarque des Fleaux", 60000, 70000, 80000, 1800000, 150000, 20000, 120000, 120000, 90000};

Classe Monarch_of_Transfig     = {"Monarque de la Transfiguration", 50000, 55000, 65000, 1600000, 150000, 20000, 110000, 130000, 110000};

// Variable globale pour stocker tous les mobs



// passif des classes






struct Rank {
    std::string R; //rank = R
    char E;
    char D;
    char C;
    char B;
    char A;
    char S;
    char Nation;
};

struct Rarity{
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



