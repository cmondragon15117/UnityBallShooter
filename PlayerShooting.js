#pragma strict

public class PlayerShooting extends UnityEngine.Networking.NetworkBehaviour {

	public var mainWeapon: PlayerWeapon = new PlayerWeapon("The Commando", 10, 100);

	private var PLAYER_TAG = "Player"; //Make constant later

	
	@SerializeField
	private var cam: Camera;

	@SerializeField
	private var mask: LayerMask;

	function Start() {

		//Checks if the camera is there for the player
		if(cam == null) {
			Debug.LogError("PlayerShooting: No camera referenced");
			this.enabled = false;
		}

	}

	function Update() {

		//Constantly checks if the player is clicking the left mouse button to shoot
		if(Input.GetButtonDown("Fire1")) {
			Shoot();
		}
	}

	@UnityEngine.Networking.Client
	public function Shoot() {
		var hit: RaycastHit; //Stores info on what we've hit

		if (Physics.Raycast(cam.transform.position, cam.transform.forward, hit, mainWeapon.range, mask)) {
			//We hit something
			 Debug.Log("Player hit " + hit.collider.name);
			 if(hit.collider.tag == PLAYER_TAG) {
			 	CmdServerShoot(hit.collider.name, mainWeapon.damage);
			 }

		}
	}

	@UnityEngine.Networking.Command
	public function CmdServerShoot(playerID: String, damage: int) {
		Debug.Log(playerID + " has been shot.");
		//Destroy(GameObject.Find(id); Used to destroy but does not destroy other references and such
		var player: Player = GetComponent(GameManager).GetPlayer(playerID);

		player.RpcTakeDamage(damage);
	}

}
