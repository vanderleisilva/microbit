const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let uBitDevice;
let rxCharacteristic;

async function connectToMicrobit() {
  try {
    console.log("Requesting Bluetooth Device...");
    uBitDevice = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "BBC micro:bit" }],
      optionalServices: [UART_SERVICE_UUID],
    });

    uBitDevice.addEventListener("gattserverdisconnected", onDisconnected);

    console.log("Connecting to GATT Server...");
    const server = await uBitDevice.gatt.connect();

    console.log("Getting Service...");
    const service = await server.getPrimaryService(UART_SERVICE_UUID);

    console.log("Getting Characteristics...");
    const txCharacteristic = await service.getCharacteristic(
      UART_TX_CHARACTERISTIC_UUID
    );
    txCharacteristic.startNotifications();

    rxCharacteristic = await service.getCharacteristic(
      UART_RX_CHARACTERISTIC_UUID
    );
  } catch (error) {
    console.log(error);
  }
}

function disconnectButtonPressed() {
  if (!uBitDevice) {
    return;
  }

  if (uBitDevice.gatt.connected) {
    uBitDevice.gatt.disconnect();
    console.log("Disconnected");
  }
}

async function sendToMicrobit(num) {
  console.log(num);
  let encoder = new TextEncoder();
  queueGattOperation(() =>
    rxCharacteristic
      .writeValue(encoder.encode(num + "\n"))
      .then(() => console.log("WRITE"))
      .catch((error) => console.error("Error:", error))
  );
}

let queue = Promise.resolve();

function queueGattOperation(operation) {
  queue = queue.then(operation, operation);
  return queue;
}

function onDisconnected(event) {
  let device = event.target;
  console.log(`Device ${device.name} is disconnected.`);
}
