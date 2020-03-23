 class Game
{
    
    GameType;
    Name;
    Duration;
    BeginDate;
    MinPlayer;
    IP;
    Players = [];
    Regions = [];
    Items = [];
    Flags = [];
    Teams=[];

    constructor(
        gameType,
        name,
        duration,
        beginDate,
        minPlayer,
        ip,
        players = [],
        zones = [],
        items = [],
        flags = [],
        teams=[])
    {   
        this.GameType = gameType;
        this.Name = name;
        this.Duration = duration;
        this.BeginDate = beginDate;
        this.MinPlayer = minPlayer;
        this.Ip = ip;
        this.Players = players;
        this.Regions = zones;
        this.Items = items;
        this.Flags = flags;
        this.Teams = teams;
    }

    addZone(region){
        this.Regions.push(region);
    }

    addItem(item){
        this.Items.push(item);
    }

    addAltar(flag){
        this.Flags.push(flag);
    }

    addTeam(team){
        this.Teams.push(team);
    }

    addPlayer(player){
        this.Players.push(player);
    }

    findZoneById(regionId){
        var indexZ = this.Regions.findIndex( ({ Id }) => Id === regionId);
        return indexZ;
    }

    findItemById(itemId){
        var indexI = this.Items.findIndex( ({ Id }) => Id === itemId);
        return indexI;
    }

    findAltarById(flagId){
        var indexA = this.Flags.findIndex( ({ Id }) => Id === flagId);
        return indexA;
    }

    findTeamById(teamId){
        var indexT = this.Teams.findIndex( ({ Id }) => Id === teamId);
        return indexT;
    }

    findPlayerById(playerId){
        var indexP = this.Players.findIndex( ({ Id }) => Id === playerId);
        return indexP;
    }

    removeZone(region){
        var err = false;

        var indexZ = this.Regions.findIndex( ({ Id }) => Id === region.id);
        if(indexZ!==-1)
        {
            this.Regions=this.Regions.filter( ({ Id }) => Id !== region.id);
        }
        else err=true;

        return err;
    }

    removeItem(item){
        var err = false;

        var indexI = this.Items.findIndex( ({ Id }) => Id === item.id);
        if(indexI!==-1)
        {
            this.Items=this.Items.filter( ({ Id }) => Id !== item.id);
        }
        else err=true;

        return err;
    }

    removeAltar(flag){
        var err = false;

        var indexA = this.Flags.findIndex( ({ Id }) => Id === flag.id);
        if(indexA!==-1)
        {
            this.Flags=this.Flags.filter( ({ Id }) => Id !== flag.id);
        }
        else err=true;

        return err;

    }

    removeTeam(team){
        var err = false;

        var indexT = this.Teams.findIndex( ({ Id }) => Id === team.id);
        if(indexT!==-1)
        {
            this.Teams=this.Teams.filter( ({ Id }) => Id !== team.id);
        }
        else err=true;

        return err;

    }

    removePlayer(player){
        var err = false;

        var indexP = this.Players.findIndex( ({ Id }) => Id === player.id);
        if(indexP!==-1)
        {
            this.Players=this.Players.filter( ({ Id }) => Id !== player.id);
        }
        else err=true;

        return err;

    }

    editZone(region){
        var err = false;

        var indexZ = this.Regions.findIndex( ({ Id }) => Id === region.id);
        if(indexZ!==-1)
        {
            let paths = []; // all the coordinates
            region.getPath().forEach(function (path) { // For each coordinates we publish an array with only the latitude and the longitude of this coordinate
                paths.push([path.lat(), path.lng()]); // save the latitude and the longitude of this coordinate
            });
            this.Regions[indexZ].Coordinates = [paths];
        }
        else err=true;

        return err;
    }

    editItem(item){
        var err = false;

        var indexI = this.Items.findIndex( ({ Id }) => Id === item.id);
        if(indexI!==-1)
        {
            this.Items[indexI].Position = [item.position.lat(),item.position.lng()];
        }
        else err=true;

        return err;
    }

    editAltar(flag){
        var err = false;

        var indexA = this.Flags.findIndex( ({ Id }) => Id === flag.id);
        if(indexA!==-1)
        {
            this.Flags[indexA].Position = [flag.position.lat(),flag.position.lng()];
        }
        else err=true;

        return err;

    }
}
class SingletonGame { // Object Game to sigleton
        static instance;
        static GameType = {
            FLAG:"FLAG",
            TIME:"TIME",
            SUPREMACY:"SUPREMACY"
        }
     
        static createInstance() {
            var object = new Game(this.GameType.FLAG,"hug","60",new Date(),"3","127.0.0.1");
            return object;
        }
     

        static getInstance(game=null){
            if(game!=null)
            {
                this.instance = new Game(game.GameType,
                                        game.default.Name,
                                        game.default.Duration,
                                        game.default.BeginDate,
                                        game.default.MinPlayer,
                                        game.default.Ip,
                                        game.default.Players,
                                        game.default.Regions,
                                        game.default.Items,
                                        game.default.Flags,
                                        game.default.Teams);
                                            }
            if (!this.instance) {
                this.instance = this.createInstance();
            }
            return this.instance;
        }
}

export default SingletonGame;
