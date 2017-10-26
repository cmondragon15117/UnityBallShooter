#pragma strict

public class Player extends UnityEngine.Networking.NetworkBehaviour {
	@SerializeField
	private var maxHealth: int = 100;

	@UnityEngine.Networking.SyncVar
	private var currentHealth: int;

	@UnityEngine.Networking.SyncVar
	private var isDead: boolean = false; //Syncs across network

	public var _isDead: boolean; //Simply for player to see

	function syncIsDead() {		
		_isDead = isDead;
		//Syncs network with client
	}

	@SerializeField
	private var componentsToDisableOnDeath: Behaviour[];

	private var wasEnabled: boolean[];

	public function Setup () {

		
		wasEnabled = new boolean[componentsToDisableOnDeath.length];

		//Checks if each component was enabled
		for(var i = 0; i < wasEnabled.length; i++) {
			wasEnabled[i] = componentsToDisableOnDeath[i].enabled;
		}

		SetDefaults();
	}

	function SetDefaults() {
		isDead = false;
		currentHealth = maxHealth;

		//Enable components for default
		for(var i = 0; i < componentsToDisableOnDeath.length; i++) {
			componentsToDisableOnDeath[i].enabled = wasEnabled[i];

		}

		//Checks if there is a collider
		var col: Collider = GetComponent(Collider);
		if(col != null) {
			col.enabled = true;
		}
	}

	function Update() {
		if(!isLocalPlayer) {
			return;
		}
		if(Input.GetKeyDown(KeyCode.K)) {
			RpcTakeDamage(100); //Speeds up the kill process to test player dying
		}

		syncIsDead();
	}

	private function Die() {
		_isDead = true;

		//Disable components
		for(var i = 0; i < componentsToDisableOnDeath.length; i++) {
			componentsToDisableOnDeath[i].enabled = false;
		}

		var col: Collider = GetComponent(Collider);
		if(col != null) {
			col.enabled = false;
		}

		Debug.Log(transform.name + " is DEAD.");

		//Call respawn method
	}

	//Network functions
	//Following tag will call on all computers connected to network
	@UnityEngine.Networking.ClientRpc
	 function RpcTakeDamage(damage: int) {
	 	if(_isDead) {
	 		return;
	 	}
		currentHealth -= damage;
		Debug.Log(transform.name + " now has " + currentHealth + " health.");

		if(currentHealth <= 0) {
			Die();
		}
	}


}