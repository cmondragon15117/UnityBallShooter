#pragma strict

@SerializeField
private var speed: float = 5;
@SerializeField
private var mouseSensitivity: float = 3;

@SerializeField
private var thrusterPower: float = 1200;

@script RequireComponent(PlayerMotor)
private var motor: PlayerMotor;

@script RequireComponent(ConfigurableJoint)
private var configurableJoint: ConfigurableJoint;


@Header("Joint Options")
@SerializeField
private var jointSpring: float = 30;
@SerializeField
private var jointMaxForce: float = 0; 

function Start () {
	motor = GetComponent(PlayerMotor); //Accesses the other JS file
	configurableJoint = GetComponent(ConfigurableJoint);
	SetJointSettings(jointSpring);
}

function Update () {
	//Calculate our movement, velocity as a 3D vector
	var xMovement: float = Input.GetAxis("Horizontal");
	var zMovement: float = Input.GetAxis("Vertical");

	var moveHorizontal: Vector3 = transform.right * xMovement;
	var moveForward: Vector3 = transform.forward * zMovement;

	//Final movement vector
	var velocity: Vector3 = (moveHorizontal + moveForward).normalized * speed;
	//Apply Movement
	motor.Move(velocity);

	//Calculates rotation as a 3D vector (turning around)
	var yRotation: float = Input.GetAxis("Mouse X");
	var rotation: Vector3 = Vector3(0, yRotation, 0) * mouseSensitivity;

	//Apply Rotation
	motor.Rotate(rotation);

	//Calculates camera rotation as a 3D vector (turning around)
	var xRotation: float = Input.GetAxis("Mouse Y");
	var cameraRotationX: float = xRotation * mouseSensitivity;

	//Apply Rotation
	motor.RotateCamera(cameraRotationX);

	//Calculate thrusterForce based on player input
	var thrusterForce: Vector3 = Vector3.zero;

	if(Input.GetButton("Jump")) {
		thrusterForce = Vector3.up * thrusterPower;
		SetJointSettings(0);
	} else {
		SetJointSettings(jointSpring);
	}

	//Apply thruster force
	motor.ApplyThrust(thrusterForce);
}

private function SetJointSettings(jS: float) {
	var drive: JointDrive = new JointDrive();
	//drive.mode = JointDriveMode.Position;
    drive.positionSpring = jS;
    drive.maximumForce = jointMaxForce;
	configurableJoint.yDrive = drive;
}