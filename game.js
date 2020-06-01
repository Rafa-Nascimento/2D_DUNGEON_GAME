(function() {


    var stage = ""; // stage do jogo
    var output; // mensagens de informação

    //código dos personagens de jogo
    const character = {
        EMPTY: -1,
        FLOOR: 0,
        WALL: 1,
        STAIRE: 2,
        STAIRS: 3,
        ICESTONE: 4,
        KEY: 5,
        STONELOCK: 6,
        DOORLOCK: 7,
        QUESTION: 8,
        BONES: 9,
        HERO: 10,
        ENEMY: 11,
        EXIT: 12
    };

    //tamanho de cada celula
    const SIZE = 32;

    const MAXMONSTERS = 10;

    const NUMBEROFLEVELS = 3;

    const sounds={
        damage:"",
        expGain:"",
        footsteps:"",
        gameOverSound:"",
        healSound:"",
        heavyHit:"",
        keyPickup:"",
        keyUsed:"",
        levelUp:"",
        lightHit:"",
        stairs:"",
        winGameScreen:"",
        fightTheme:"",
        normalTheme:"",
        hurtSkeleton:"",
        damageZombie:"",
        energyDrain:"",
        switchKeys:""
    };

    //codigo das teclas
    const teclado = {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40,
        SPACE: 32,
        ESC: 27,
        ENTER: 13,
        LSHIFT: 16,
        RSHIFT: 16,
        LALT: 18,
        LCTRL: 17,
        KPAD_PLUS: 107,
        KPAD_MINUS: 109
    };

    const enemyDirection = {
        LEFT: 1,
        RIGHT: 2,
        UP: 3,
        DOWN: 4
    };

    const map = new Array(NUMBEROFLEVELS);
    for(var i=0;i<NUMBEROFLEVELS;i++)
        map[i] = new Array(3);

    //const map = new Array(3);
    map[0][0] = [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    map[0][1] = [
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1, 5, 1, 5, 1, 9, 5, 5, 5, 5, 5, 9, 1,-1,-1,-1, 9, 1],
        [ 1,-1, 1,-1, 1, 1,-1, 1, 1, 1,-1, 1, 1,-1, 8,-1, 9, 1],
        [ 1,-1, 1,-1, 1,-1,11,-1,-1,-1,11,-1, 1,-1,-1,-1, 9, 1],
        [ 1,11, 1,11, 1, 1, 1, 1, 7, 1, 1, 1, 1, 6, 1, 1, 9, 1],
        [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1, 1, 1, 6, 1, 1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1, 1,-1,11,-1, 1,-1,-1, 1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1, 7,-1, 3,-1, 7,-1,-1, 1, 1, 1,-1, 1],
        [ 1,-1,-1, 8,-1,-1, 1,-1,-1,-1, 1,-1,-1,-1,11,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1, 1, 1, 6, 1, 1,-1,-1,-1,-1,-1,-1, 1],
        [ 1, 7, 1, 1, 1,-1,-1,-1,-1,-1,-1,-1,-1, 1,-1, 1,-1, 1],
        [ 1,11,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1, 1,-1, 1,-1, 1],
        [ 1,-1, 1, 6, 1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 9, 1,-1, 1],
        [ 1,-1, 1,-1, 1,-1,-1, 1,-1, 1,-1, 1,-1, 1, 1, 1,-1, 1],
        [ 1,-1, 1, 5, 1, 5, 1, 1, 9, 1, 9, 1, 1,-1, 1,-1,-1, 1],
        [ 1, 5, 1,10, 1,-1, 1, 8,-1,11,-1, 8, 1,-1,-1,-1, 9, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    map[0][2] = [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4,-1],
        [-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4,-1],
        [-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4, 4, 4,-1,-1,-1, 4, 4, 4, 4, 4,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //--------------------------------------------------------------------------------------------------------------------//

    map[1][0] = [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    map[1][1] = [
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,11,-1,-1, 1,-1,11,-1,-1,-1,-1,11,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1, 9,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1, 1, 1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1, 1,-1,-1,-1,11, 1, 1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1, 1,-1,-1, 1,-1,-1, 1,-1, 8, 1, 1, 1, 1],
        [ 1,-1, 5,-1,-1, 9,-1,-1, 1,-1,-1, 1,-1, 1, 9, 9, 9, 1],
        [ 1, 1, 1, 1, 1, 1, 1,-1, 1, 9,-1, 1,-1,-1, 1, 9, 9, 1],
        [ 1,-1,-1,-1,-1,-1,-1,-1, 1,-1, 5, 1,-1,11,-1, 1, 9, 1],
        [ 1,-1,-1,-1,11,-1,-1,-1, 1, 1, 7, 1, 1, 1,-1,-1, 1, 1],
        [ 1,-1,-1,-1,-1,-1,-1, 9,-1,-1,-1,-1,-1,11,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1,-1,-1, 9,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1,11,-1,-1,-1,-1,-1,-1, 1,-1,-1, 1],
        [ 1, 7, 1, 9, 9, 9, 9, 9, 9,-1,-1,-1,-1,-1, 1,-1, 1, 1],
        [ 1, 3, 6, 8, 8, 8, 8, 8, 6,-1,-1,-1,-1, 2, 1,-1, 8, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    map[1][2] = [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1, 4, 4, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //--------------------------------------------------------------------------------------------------------------------//

    map[2][0] = [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    map[2][1] = [
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1,-1,-1,-1,-1,-1,-1, 1,12, 1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,11,-1,-1,-1,-1,-1, 1, 6, 1,-1,-1,-1,11,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1, 1,-1, 1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1, 1,-1, 1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1, 1, 7, 1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,11,-1,-1,-1, 1,-1, 1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1, 1,-1, 1,-1, 1, 1, 1, 1, 1, 1, 1],
        [ 1,-1,-1,-1,-1,-1,-1, 1, 6, 1,-1,-1,-1, 1, 8, 1,-1, 1],
        [ 1, 1,-1,-1,-1,-1,-1,-1,-1,-1,11,-1,-1, 8, 2, 8,-1, 1],
        [ 1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 8, 1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,11, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,11,-1,11,-1,11, 1,-1,11,-1,-1,-1,-1,-1,-1,-1,-1, 1],
        [ 1,-1,-1,-1,-1,-1,-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [ 1,-1,-1,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    map[2][2] = [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 4,-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1, 4,-1, 4,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //--------------------------------------------------------------------------------------------------------------------//

    var LEVEL = 0;
    var LAYERS = map[LEVEL].length;
    var ROWS = map[LEVEL][0].length;
    var COLUMNS = map[LEVEL][0][0].length;
    
    var noofMonsters=0;
    var playerRow;
    var playerColumn;
    var enemyRow;
    var enemyColumn;
    var numberOfKeys = 0;
    var up = false;
    var down = false;
    var stairsColumn;
    var stairsRow;
    var monsterRow;
    var monsterColumn;
    var lvl = 1;
    var minLight = 3;
    var maxLight = 5;
    var minHeavy = 3;
    var maxHeavy = 6;
    var randomOptions = new Array(6);
    var switchKeys = false;
    var switchKeysCounter  = 0;
    var bonesFight = false;
    

    var enemies = new Array(MAXMONSTERS);
    for(let i=0; i<MAXMONSTERS; i++){
        enemies[i]= new Array(3);
    }

    
    window.addEventListener("load", init, false);

    function init() {
        stage = document.querySelector("#stage");
        output = document.querySelector("#infoPanel");

        sounds.normalTheme=document.querySelector("#normalTheme");
        sounds.normalTheme.volume=0.5;
        sounds.fightTheme=document.querySelector("#fightTheme");
        sounds.footsteps=document.querySelector("#footsteps");
        sounds.expGain=document.querySelector("#expGain");
        sounds.gameOverSound=document.querySelector("#gameOverSound");
        sounds.healSound=document.querySelector("#healSound");
        sounds.heavyHit=document.querySelector("#heavyHit");
        sounds.keyPickup=document.querySelector("#keyPickup");
        sounds.keyUsed=document.querySelector("#keyUsed");
        sounds.levelUp=document.querySelector("#levelUp");
        sounds.lightHit=document.querySelector("#lightHit");
        sounds.damage=document.querySelector("#damage");
        sounds.stairs=document.querySelector("#stairs");
        sounds.winGameScreen=document.querySelector("#winGameScreen");
        sounds.damageZombie=document.querySelector("#damageZombie");
        sounds.hurtSkeleton=document.querySelector("#hurtSkeleton");
        sounds.energyDrain=document.querySelector("#energyDrain");
        sounds.switchKeys=document.querySelector("#switchKeys");

        window.addEventListener("keydown",keydownHandler,false);
        findGameObjects();
        render();
        output.innerHTML = "Use the arrow keys to move, once you're in a fight use the MINUS and PLUS key to use light and heavy attack!";
    }
//--------------------------------------------------------------------------------------------------------------------//
    function findGameObjects(){
        let i = 0;

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                if (map[LEVEL][1][row][col] === character.HERO) {
                    playerColumn = col;
                    playerRow = row;
                }
                if (map[LEVEL][1][row][col] === character.ENEMY) {
                    enemies[i][0]=row;
                    enemies[i][1]=col;
                    enemies[i][2]=enemyDirection.UP;
                    i++;
                }
            }
        }
        noofMonsters=i;
        

    }
//--------------------------------------------------------------------------------------------------------------------//
    function render(event){
        while(stage.hasChildNodes()) stage.removeChild(stage.firstChild);
        for (let lvl=0; lvl<LAYERS;lvl++) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    let cell = document.createElement("div");

                    cell.setAttribute("class", "cell");
                    stage.appendChild(cell);

                    switch (map[LEVEL][lvl][row][col]) {
                        case character.HERO :
                            cell.classList.add("actor");
                        if(event === teclado.DOWN) {
                            cell.classList.add("downHero");
                        } else if(event === teclado.LEFT) {
                            cell.classList.add("leftHero");
                        } else if(event === teclado.RIGHT) {
                            cell.classList.add("rightHero");
                        }
                            break;
                        case character.ENEMY :
                            for (let i = 0; i < noofMonsters; i++) {
                                if (row == enemies[i][0] && col == enemies[i][1]) {
                                    switch (enemies[i][2]) {
                                        case 1 :
                                            cell.classList.add("leftEnemy");
                                            break;//left
                                        case 2 :
                                            cell.classList.add("rightEnemy");
                                            break;//right
                                        case 3 :
                                            cell.classList.add("enemy");
                                            break;//up
                                        case 4 :
                                            cell.classList.add("downEnemy");
                                            break;//down
                                    }
                                }
                            }
                            break;
                        case character.BONES   :
                            cell.classList.add("bones");
                            break;
                        case character.KEY   :
                            cell.classList.add("key");
                            break;
                        case character.QUESTION  :
                            cell.classList.add("question");
                            break;
                        case character.WALL   :
                            cell.classList.add("wall");
                            break;
                        case character.FLOOR  :
                            cell.classList.add("floor");
                            break;
                        case character.STAIRS  :
                            cell.classList.add("stairsS");
                            break;
                        case character.STAIRE   :
                            cell.classList.add("stairsE");
                            break;
                        case character.ICESTONE  :
                            cell.classList.add("iceStone");
                            break;
                        case character.STONELOCK :
                            cell.classList.add("stoneLock");
                            break;
                        case character.DOORLOCK   :
                            cell.classList.add("doorLock");
                            break;
                        case character.EMPTY :
                            cell.classList.add("empty");
                            break;
                        case character.EXIT :
                            cell.classList.add("exit");
                            break;
                    }
                    cell.style.top = row * SIZE + "px";
                    cell.style.left = col * SIZE + "px";
                }
            }
        }
        let showLevel = document.getElementById("nvl");
        showLevel.innerHTML = "LEVEL: " + (parseInt(LEVEL,10) + 1);
    }
//--------------------------------------------------------------------------------------------------------------------//
    function keydownHandler(event){
        if (switchKeysCounter === 10) switchKeys = false;
        switch (event.keyCode) {
            case teclado.UP :
                if (switchKeys === true) {
                    movePlayers(playerRow+1, playerColumn);
                    switchKeysCounter++;
                } else {movePlayers(playerRow-1, playerColumn);}
                break;

            case teclado.DOWN :
                if (switchKeys === true) {
                    movePlayers(playerRow-1, playerColumn);
                    switchKeysCounter++;
                } else {movePlayers(playerRow+1, playerColumn);}
                break;

            case teclado.LEFT :
                if (switchKeys === true) {
                    movePlayers(playerRow, playerColumn + 1);
                    switchKeysCounter++;
                } else {movePlayers(playerRow, playerColumn-1);}
            break;


            case teclado.RIGHT:
                if (switchKeys === true) {
                    movePlayers(playerRow, playerColumn-1);
                    switchKeysCounter++;
                } else {movePlayers(playerRow, playerColumn+1);}
            break;

        }
    }
//--------------------------------------------------------------------------------------------------------------------//
    function fightKeydownHandler(event){
        switch (event.keyCode) {
            case teclado.KPAD_MINUS: hit(1); break;
            case teclado.KPAD_PLUS:  hit(2); break;
        }
    }
//--------------------------------------------------------------------------------------------------------------------//
    function moveEnemy(){

        let validDirections = [];
        let direction;
        let i=getRandomInt(noofMonsters);

        enemyRow = enemies[i][0];
        enemyColumn = enemies[i][1];


        if(map[LEVEL][1][enemyRow-1][enemyColumn]!==character.WALL){
            //teste para cima
            let thingAbove = map[LEVEL][1][enemyRow-1][enemyColumn];
            if(thingAbove === (character.EMPTY || character.FLOOR)) {
                validDirections.push(enemyDirection.UP);
            }
        }
        if(map[LEVEL][1][enemyRow+1][enemyColumn]!==character.WALL){
            //teste para baixo
            let thingAbove = map[LEVEL][1][enemyRow+1][enemyColumn];
            if(thingAbove === (character.EMPTY || character.FLOOR)) {
                validDirections.push(enemyDirection.DOWN);
            }
        }
        if(map[LEVEL][1][enemyRow][enemyColumn+1]!==character.WALL){
            //teste para a direita
            let thingAbove = map[LEVEL][1][enemyRow][enemyColumn+1];
            if(thingAbove === (character.EMPTY || character.FLOOR)) {
                validDirections.push(enemyDirection.RIGHT);
            }
        }
        if(map[LEVEL][1][enemyRow][enemyColumn-1]!==character.WALL){
            //teste para a esquerda
            let thingAbove = map[LEVEL][1][enemyRow][enemyColumn-1];
            if(thingAbove === (character.EMPTY || character.FLOOR)) {
                validDirections.push(enemyDirection.LEFT);
            }
        }
        //Verificar os movimentos possiveis e guardar num array
        if(validDirections.length>0){
            let randomNumber = Math.floor(Math.random()*validDirections.length);
            direction = validDirections[randomNumber];
        }
        switch (direction) {
            case enemyDirection.UP :
                clearEnemy(enemyRow,enemyColumn);
                enemyRow--;
                map[LEVEL][1][enemyRow][enemyColumn]=character.ENEMY;
                break;

            case enemyDirection.DOWN :
                clearEnemy(enemyRow,enemyColumn);
                enemyRow++;
                map[LEVEL][1][enemyRow][enemyColumn]=character.ENEMY;
                break;

            case enemyDirection.LEFT :
                clearEnemy(enemyRow,enemyColumn);
                enemyColumn--;
                map[LEVEL][1][enemyRow][enemyColumn]=character.ENEMY;
                break;

            case enemyDirection.RIGHT :
                clearEnemy(enemyRow,enemyColumn);
                enemyColumn++;
                map[LEVEL][1][enemyRow][enemyColumn]=character.ENEMY;
                break;
        }
        enemies[i][0]=enemyRow;
        enemies[i][1]=enemyColumn;
        enemies[i][2]=direction;
    }
//--------------------------------------------------------------------------------------------------------------------//
    function keyCheck() {
        let keys = document.getElementById("keys");
        if (map[LEVEL][1][playerRow][playerColumn] === character.KEY) {
            output.innerHTML = "You found a key.";
            numberOfKeys++;
            sounds.keyPickup.play();
        } else if(((map[LEVEL][1][playerRow][playerColumn] === character.STONELOCK) && numberOfKeys>0)||
            ((map[LEVEL][1][playerRow][playerColumn] === character.DOORLOCK) && numberOfKeys>0)){
            output.innerHTML = "You unlocked the door, the key broke.";
            numberOfKeys--;
            sounds.keyUsed.play();
        }
        keys.innerHTML = "Golden Keys ["+numberOfKeys+"]";
    }
//--------------------------------------------------------------------------------------------------------------------//
    function getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }
//--------------------------------------------------------------------------------------------------------------------//
    function clearEnemy(r,c){
        if(!(r===playerRow && c===playerColumn)){
            map[LEVEL][1][r][c]=-1;
        }
    }
//--------------------------------------------------------------------------------------------------------------------//
    function experience(ammount) {

        let experience = document.getElementById("experience");
        let xp = document.getElementById("xp");
        let health = document.getElementById("health");
        let hp = document.getElementById("hp");
        let light = document.getElementById("light");
        let heavy = document.getElementById("heavy");


      if(ammount!==undefined){
          experience.value+=ammount;
          sounds.expGain.play();
      }

        if(experience.value===100){
            experience.value = 0;
            lvl++;
            xp.innerHTML = "Experience Bar [Level "+lvl+"]";
                health.max  +=25;
                health.value=health.max;
                minLight+=3;
                maxLight+=5;
                minHeavy+=3;
                maxHeavy+=6;
                light.innerHTML="Attack Power ["+(5+minLight)+"~"+(5+maxLight)+"]";
                heavy.innerHTML="Attack Power ["+(9+minHeavy)+"~"+(9+maxHeavy)+"]";
                hp.innerHTML = "Health Bar ["+health.value+"]";
                sounds.levelUp.play();
        }
    }
//--------------------------------------------------------------------------------------------------------------------//
    function energyConsumption() {
        let energy = document.getElementById("energy");
        let counter = document.getElementById("counter");
       if(energy.value>1) {
           energy.value--;
       } else {
           energy.value = 0;
           window.removeEventListener("keydown",keydownHandler,false);
       }
        counter.innerHTML = "Energy Bar ["+energy.value+"]";
    }
//--------------------------------------------------------------------------------------------------------------------//
    function upLevel(){
        sounds.stairs.play();
        //map[LEVEL][1][r][c] = character.STAIRS;
        map[LEVEL][1][playerRow][playerColumn] = character.EMPTY;
        LEVEL++;
        up=true;
        down=!up;
        //obtem posição das escadas no LEVEL seguinte, e guarda em var
        found:
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                if (map[LEVEL][1][row][col] === character.STAIRE) {
                    stairsColumn = col;
                    stairsRow = row;
                    break found;
                }
            }
        }
        playerColumn = stairsColumn;
        playerRow = stairsRow;

        //posiciona boneco nessa posição
        map[LEVEL][1][playerRow][playerColumn] = character.HERO;
        output.innerHTML = "You went up the stairs to level : " + (LEVEL + 1);
        init();
    }
    //--------------------------------------------------------------------------------------------------------------------//
    function downLevel(){
        sounds.stairs.play();
        //map[LEVEL][1][r][c] = character.STAIRE;
        map[LEVEL][1][playerRow][playerColumn] = character.EMPTY;
        LEVEL--;
        up=false;
        down=!up;
        //obtem posição das escadas no LEVEL anterior, e guarda em var
        found:
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                if (map[LEVEL][1][row][col] === character.STAIRS) {
                    stairsColumn = col;
                    stairsRow = row;
                    break found;
                }
            }
        }
        playerColumn = stairsColumn;
        playerRow = stairsRow;

        //posiciona boneco nessa posição
        map[LEVEL][1][playerRow][playerColumn] = character.HERO;
        output.innerHTML = "You went down the stairs to level : " + (LEVEL + 1);
        init();
    }
//--------------------------------------------------------------------------------------------------------------------//
    function movePlayers(r,c) {

        //VERIFICA SE A JOGADA É VALIDA.
        switch ( map[LEVEL][1][r][c] ) {
            case character.STAIRS : upLevel(); break;
            case character.STAIRE : downLevel(); break;
            case character.WALL : break;
            case character.ENEMY : doFight(r,c); break;
            case character.BONES : isBoneFight(); if (bonesFight===true){doFight(r,c);} else {experience(25); doMove(r,c)} break;
            case character.QUESTION : questionMarkRandom(); doMove(r,c); break;
            case character.EXIT : endGame(r,c); break;
            case character.STONELOCK :
            case character.DOORLOCK : if (numberOfKeys > 0) {doMove(r,c);} else {output.innerHTML = "You need a key first.";} break;
            default : doMove(r,c);
        }

    render(event.keyCode);
    }
   //--------------------------------------------------------------------------------------------------------------------//
  function doMove(row,col){
    document.getElementById("monsterBar").style.display= "none";
    map[LEVEL][1][playerRow][playerColumn] = character.EMPTY;
 
    if (up){
        map[LEVEL][1][stairsRow][stairsColumn] = character.STAIRE;
        up=false;

    }
    if (down){
        map[LEVEL][1][stairsRow][stairsColumn] = character.STAIRS;
        down=false;
    }

    sounds.footsteps.play();
      playerRow=row;
      playerColumn=col;
      keyCheck();
      experience();
      map[LEVEL][1][playerRow][playerColumn] = character.HERO;
      energyConsumption();
      moveEnemy();

    }
//--------------------------------------------------------------------------------------------------------------------//
    function getAttackRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
//--------------------------------------------------------------------------------------------------------------------//
    function doFight(row,col){

        let monsterHp = document.getElementById("monsterHp");
        let monsterHealth = document.getElementById("monsterHealth");
        monsterHealth.value=100;
        monsterHp.innerHTML = "Monster Health Bar ["+monsterHealth.value+"]";
        sounds.normalTheme.pause();
        sounds.fightTheme.play();
        monsterRow = row;
        monsterColumn = col;
        window.removeEventListener("keydown",keydownHandler,false);
        window.addEventListener("keydown",fightKeydownHandler,false);
        output.innerHTML = "You found an enemy, smack it on the head!";
        document.getElementById("monsterBar").style.display= "block";
    }
//--------------------------------------------------------------------------------------------------------------------//
    function hit(opt){
       let health = document.getElementById("health");
       let hp = document.getElementById("hp");
       let monsterHealth = document.getElementById("monsterHealth");
       let monsterHp = document.getElementById("monsterHp");
       let probability=getRandomInt(100);
       let damage = 0;
       let perc = 0;

        switch (opt) {
            case 1 : damage = 5 + getAttackRange(minLight,maxLight); perc = 90;
                     output.innerHTML = "You inflicted " + damage + " with a light attack!";
                     sounds.lightHit.play();
                break;
            case 2 : damage = 9 + getAttackRange(minHeavy,maxHeavy); perc = 70;
                     output.innerHTML = "You inflicted " + damage + " with a HEAVY attack!";
                sounds.heavyHit.play();
                break;
        }
     
       if(probability<=perc){
           monsterHealth.value -= damage;
           monsterHp.innerHTML = "Monster Health Bar ["+monsterHealth.value+"]";
           if(bonesFight){sounds.hurtSkeleton.play();}
            else {sounds.damageZombie.play();}
       }

        if (bonesFight===false){
            health.value -= enemyHit(10);
            hp.innerHTML = "Health Bar ["+health.value+"]";
            sounds.damage.play();
            }

        if (bonesFight===true){
            health.value -= enemyHit(5);
            hp.innerHTML = "Health Bar ["+health.value+"]";
            sounds.damage.play();
        }

        if(monsterHealth.value === 0) {
            experience(50);
            output.innerHTML = "You won the fight, gained 50 experience!";
            window.removeEventListener("keydown",fightKeydownHandler,false);
            window.addEventListener("keydown",keydownHandler,false);
            sounds.fightTheme.pause();
            sounds.currentTime = 0;
            sounds.normalTheme.play();

        }

        if(health.value === 0){
            window.removeEventListener("keydown",fightKeydownHandler,false);
            output.innerHTML = "Game Over.";
            sounds.fightTheme.pause();
            sounds.currentTime = 0;
            sounds.gameOverSound.play();
        }

        if((monsterHealth.value===0) && (bonesFight===false)){
            var j=0;
            for (let i = 0; i < enemies.length; i++) {

                if (enemies[i][0]=== monsterRow && enemies[i][1]===monsterColumn) {
                    if(i===0){
                        enemies[0].shift();
                    }
                    else {
                        for(j=i;j<noofMonsters-1;j++){
                            enemies[j][0]=enemies[j+1][0];
                            enemies[j][1]=enemies[j+1][1];
                        }
                        if(noofMonsters!=MAXMONSTERS) {
                            enemies[noofMonsters].splice(0, 1);
                            enemies[noofMonsters].splice(1, 1);
                        }
                    }
                    noofMonsters--;
                    map[LEVEL][1][monsterRow][monsterColumn] = character.EMPTY;
                    break;
                }
            }
        }
        if((monsterHealth.value===0) && (bonesFight===true)){
            output.innerHTML = "You defeated the bones, gained 25 experience!";
            map[LEVEL][1][monsterRow][monsterColumn] = character.EMPTY;
            bonesFight=false;
        }
        
        render();
    }
//--------------------------------------------------------------------------------------------------------------------//
    function enemyHit(hit){return  getRandomInt(hit);}
//--------------------------------------------------------------------------------------------------------------------//
    function questionMarkRandom(){

        let option = getRandomInt(randomOptions.length);
        let health = document.getElementById("health");
        let hp = document.getElementById("hp");
        let energy = document.getElementById("energy");
        let counter = document.getElementById("counter");
        let valueGiven = 0;


        switch (option){
            case 0 :
                experience(50);
                output.innerHTML = "You gained 50 experience."; break;

            case 1 : if(health.value!==health.max){
                        valueGiven = 0;
                        valueGiven = (health.max) - (health.value);
                        health.value+=20;
                        sounds.healSound.play();
                        if(valueGiven < 20){
                            output.innerHTML = "Recebeu " + valueGiven + " de vida.";
                        } else {output.innerHTML = "Recebeu " + 20 + " de vida."; }
                     } else {output.innerHTML = "Health ao máximo.";}
                     hp.innerHTML = "Health Bar ["+health.value+"]"; break;

            case 2 : if(energy.value!==energy.max){
                        valueGiven = 0;
                        valueGiven = (energy.max) - (energy.value);
                        energy.value+=20;
                        sounds.healSound.play();
                        if(valueGiven < 20){
                            output.innerHTML = "Ganhou " + valueGiven + " de energia.";
                            } else { output.innerHTML = "Recebeu 20 de energia."; }
                     } else {output.innerHTML = "Energia ao máximo.";}
                     counter.innerHTML = "Energy Bar ["+energy.value+"]" ;break;

            case 3 : health.value-=10;
                sounds.damage.play();

                if(health.value > 10) {
                    output.innerHTML = "You lost 10 Health.";
                } else {output.innerHTML = "You lost too much Health and died";}
                hp.innerHTML = "Health Bar [" + health.value + "]";break;

            case 4 : energy.value-=10;
                sounds.energyDrain.play();
                if(energy.value > 10) {
                    output.innerHTML = "You lost 10 Energy.";
                } else {output.innerHTML = "You lost too much Energy and collapsed on the floor.";}
                counter.innerHTML = "Energy Bar [" + energy.value + "]" ;break;

            case 5 :  switchKeysCounter=0;
                      switchKeys = true;
                      sounds.switchKeys.play();
                      output.innerHTML = "Something happened...but what exactly...";
                          break;

            default: break;
        }
    }
//--------------------------------------------------------------------------------------------------------------------//
    function isBoneFight(){
        let fightEvent = getRandomInt(2);
        if (fightEvent===0){
            bonesFight=true;
        }
    }
//--------------------------------------------------------------------------------------------------------------------//
    function endGame(row,col){
        let health = document.getElementById("health");
        let energy = document.getElementById("energy");
        let pontuacao = lvl + health.value + energy.value;
        window.removeEventListener("keydown",keydownHandler,false);
        map[LEVEL][1][playerRow][playerColumn] = character.EMPTY;
        map[LEVEL][1][row][col] = character.HERO;
        sounds.gameOverSound.play();
        output.innerHTML = "You Won with a score of " + pontuacao;
    }
    
    })();