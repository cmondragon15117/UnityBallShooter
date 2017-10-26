#pragma strict


@script RequireComponent(PlayerController)
@script RequireComponent(Player) 
public class PlayerSetup extends UnityEngine.Networking.NetworkBehaviour {
//    public override function OnServerConnect(conn: NetworkConnection) {
//        Debug.Log("OnPlayerConnected");
//    }

	
	@SerializeField 
	private var componentsToDisable: Behaviour[];

	@SerializeField
	private var remoteLayerName: String = "Remote Player";

	private var sceneCam: Camera;

    function Start () {
    	
		if(!isLocalPlayer) {
			DisableComponents();
			AssignRemoteLayer();
		} else {
			sceneCam = Camera.main;
			//Disables the scene camera when local player
			if(sceneCam != false) {

				sceneCam.gameObject.SetActive(false);
			}
		}

		GetComponent(Player).Setup();
		RegisterPlayer();

	}

	function Update () {
	
	}

	function OnStartClient() {
		super.OnStartClient();
		var netID: String = GetComponent(UnityEngine.Networking.NetworkIdentity).netId.ToString();
		var _player: Player = GetComponent(Player);
		GetComponent(GameManager).RegisterPlayer(netID, _player);


	}

	function RegisterPlayer() {
		var userID: String = "Player " + GetComponent(UnityEngine.Networking.NetworkIdentity).netId; //Receives unique id from network
		transform.name = userID; //Assigns name to player clone
	}

	function AssignRemoteLayer() {
		gameObject.layer = LayerMask.NameToLayer(remoteLayerName);
	}
	 
	//Disables components of the player when not connected to a local server
	function DisableComponents() {
		for(var i = 0; i < componentsToDisable.length; i++) {
			componentsToDisable[i].enabled = false;
		}


	}

	function OnDisable() {
		if(sceneCam != null) { //Re-enable scene camera
			sceneCam.gameObject.SetActive(true);
		} 
		//Check if player exists to unregister here
		if(!isLocalPlayer) {
        	GetComponent(GameManager).UnRegisterPlayer(transform.name);
        }
	}
}

