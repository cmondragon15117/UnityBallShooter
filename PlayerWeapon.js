#pragma strict

@System.Serializable
public class PlayerWeapon {
	public var name: String;
	public var damage: int;
	public var range: float;

	public function PlayerWeapon(name: String , damage: int, range: float) {
		this.name = name;
		this.damage = damage;
		this.range = range;
	}

}