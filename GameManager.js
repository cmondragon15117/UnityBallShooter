#pragma strict

//public class GameManager extends UnityEngine.Networking.NetworkBehaviour {
private static var players = {};
private static var PLAYER_ID_PREFIX: String =  "Player ";
static function RegisterPlayer(netID: String, _player: Player) {
	var playerID: String = PLAYER_ID_PREFIX + netID;
	players.Add(playerID, _player);
	_player.transform.name = playerID;
    
}


function Start () {
		
}

function Update () {
		
}

function UnRegisterPlayer(playerID: String) { 
	//Removing this player
    players.Remove(playerID);

}

static function GetPlayer(playerID: String) {
	return players[playerID]; 
}

//function OnGUI() {
//	GUILayout.BeginArea(new Rect(200, 200, 200, 500));
//	GUILayout.BeginVertical();
//
//	for(var playerID in players) { 
//		//GUILayout.Label(playerID + " - " + players[playerID].transform.name);
//	} 
//
//	GUILayout.EndVertical();
//	GUILayout.EndArea();
//}


//}