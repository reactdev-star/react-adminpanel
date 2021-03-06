 class Game
{
    
    Type;
    Name;
    Duration;
    BeginDate;
    EndDate;
    MinPlayer;
    IP;
    Players = [];
    Regions = [];
    Items = [];
    Flags = [];
    Teams=[];
    IsFinal= false;
    IsPublic= false;
    HasEnded = false;

    constructor(
        type,
        name,
        duration,
        beginDate,
        endDate,
        minPlayer,
        ip,
        players = [],
        zones = [],
        items = [],
        flags = [],
        teams=[],
        isFinal = false,
        isPublic = false,
        hasEnded = false,
        )
    {   
        this.Type = type;
        this.Name = name;
        this.Duration = duration;
        this.BeginDate = beginDate;
        this.EndDate = endDate;
        this.MinPlayer = minPlayer;
        this.Ip = ip;
        this.Players = players;
        this.Regions = zones;
        this.Items = items;
        this.Flags = flags;
        this.Teams = teams;
        this.IsFinal = isFinal;
        this.IsPublic = isPublic;
        this.HasEnded = hasEnded;
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

    getZoneById(regionId){
        var indexZ = this.Regions.findIndex( ({ Id }) => Id === regionId);
        return this.Regions[indexZ];
    }

    getItemById(itemId){
        var indexI = this.Items.findIndex( ({ Id }) => Id === itemId);
        return this.Items[indexI];
    }

    getAltarById(flagId){
        var indexA = this.Flags.findIndex( ({ Id }) => Id === flagId);
        return this.Flags[indexA];
    }

    getTeamById(teamId){
        var indexT = this.Teams.findIndex( ({ Id }) => Id === teamId);
        return this.Teams[indexT];
    }

    getPlayerById(playerId){
        var indexP = this.Players.findIndex( ({ Id }) => Id === playerId);
        return this.Players[indexP];
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
            this.Regions[indexZ].Coordinates = paths;
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

    replaceRegion(indexZ,newRegion){
        this.Regions[indexZ] = newRegion;
    }

    replaceAltar(indexA,newAltar){
        //console.log("this.Flags[indexI]",this.Flags[indexA]);
        //console.log("newItem",newAltar);
        this.Flags[indexA] = newAltar;
    }

    replaceItem(indexI,newItem){
        //console.log("this.Items[indexI]",this.Items[indexI]);
        this.Items[indexI] = newItem;
    }

    replacePlayer(indexP,newPlayer){
        this.Players[indexP] = newPlayer;
    }

}
class SingletonGame { // Object Game to sigleton
    static instance;
    static GameType = {
        FLAG:0,
        TIME:1,
        SUPREMACY:2
    }   

    static getInstance(game=null){
        if(game!=null)
        {
            this.instance = new Game(game.Type,
                                    game.Name,
                                    game.Duration,
                                    game.BeginDate,
                                    game.EndDate,
                                    game.MinPlayer,
                                    game.Ip,
                                    game.Players,
                                    game.Regions,
                                    game.Items,
                                    game.Flags,
                                    game.Teams,
                                    game.IsFinal,
                                    game.IsPublic,
                                    game.HasEnded
                                    );
        }
        
        return this.instance;
    }
}

export default SingletonGame;
