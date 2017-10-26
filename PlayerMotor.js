#pragma strict

@SerializeField
private var cam: Camera;

private var velocity: Vector3 = Vector3.zero;
private var rotation: Vector3 = Vector3.zero;
private var cameraRotationX: float = 0 ;
private var thrusterForce: Vector3 =  Vector3.zero;

@SerializeField
private var cameraRotationLimit: float = 85;
private var currentCameraRotationX: float = 0;

@script RequireComponent(Rigidbody)
private var rb: Rigidbody;
function Start () {
	
}

function Update () {
	rb = GetComponent.<Rigidbody>();

	//Runs physics iteration
	PerformMove();
	PerformRotation();
}

//Gets a translational vector
function Move(v: Vector3) {
	velocity = v;
}

//Gets a rotational vector
function Rotate(r: Vector3) {
	rotation = r;
}

//Gets a rotational vector
function RotateCamera(cr: float) {
	cameraRotationX = cr;
} 

//Moves object
function PerformMove() {
	if(velocity != Vector3.zero) {
		rb.MovePosition(rb.position + velocity * Time.fixedDeltaTime);
	}
	if(thrusterForce != Vector3.zero) {
		rb.AddForce(thrusterForce * Time.fixedDeltaTime, ForceMode.Acceleration);
	}
}

//Rotates object
function PerformRotation() {
	rb.MoveRotation(rb.rotation * Quaternion.Euler(rotation));
	if(cam != null) {
		//Set our rotation and clamping (limit)
		currentCameraRotationX -= cameraRotationX; //Inverses the rotation (-) 
		currentCameraRotationX = Mathf.Clamp(currentCameraRotationX, -cameraRotationLimit, cameraRotationLimit);

		//Apply rotation to the transformation of our camera
		cam.transform.localEulerAngles = new Vector3(currentCameraRotationX, 0, 0);
	}
}

//Get force vector for the thruster
function ApplyThrust(v3: Vector3) {
	thrusterForce = v3;
}


