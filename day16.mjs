export const parseInput = (input) => input.split('').map(hex2bin).join('');

const hex2bin = (hex) => {
    return (parseInt(hex, 16).toString(2)).padStart(4, '0');
}

const parseLiteralValuePacket = (packet) => {
    let packetSize = 0;
    let readingPacket = packet;
    let bits = '';
    let finalGroup = false;

    while (finalGroup === false) {
        bits += readingPacket.substring(1, 5);
        finalGroup = readingPacket.substring(0, 1) === '0';
        readingPacket = readingPacket.substring(5);
        packetSize += 5;
    }

    return {
        value: parseInt(bits, 2),
        packetSize,
    };
};

const parseOperatorPacket = (packet) => {
    const lengthTypeID = packet.substring(0, 1);
    const subPackets = [];
    let packetSize = 1;

    if (lengthTypeID === '0') {
        const subPacketTotalBitLength = parseInt(packet.substring(1, 16), 2);
        packetSize += 15;
        let remainingPacket = packet.substring(16);
        let readBitLength = 0;
        while (readBitLength < subPacketTotalBitLength) {
            const parsedPacket = parseNextPacket(remainingPacket.substring(readBitLength));
            subPackets.push(parsedPacket);
            readBitLength += parsedPacket.packetSize;
            packetSize += parsedPacket.packetSize;
        }
    } else if (lengthTypeID === '1') {
        const numSubPackets = parseInt(packet.substring(1, 12), 2);
        packetSize += 11;
        let remainingPacket = packet.substring(12);
        let readBitLength = 0;
        for (let index = 0; index < numSubPackets; index++) {
            const parsedPacket = parseNextPacket(remainingPacket.substring(readBitLength));
            subPackets.push(parsedPacket);
            readBitLength += parsedPacket.packetSize;
            packetSize += parsedPacket.packetSize;
        }
    } else {
        throw new Error('Invalid length type ID');
    }

    return {
        subPackets,
        packetSize,
        lengthTypeID
    };
};

const calculateOperationValue = (packetType, packet) => {
    switch (packetType) {
        case 0:
            // SUM
            return packet.subPackets.reduce((acc, p) => acc + p.value, 0);
        case 1:
            // PRODUCT
            return packet.subPackets.reduce((acc, p) => acc * p.value, 1);
        case 2:
            // MINIMUM
            return Math.min(...packet.subPackets.map(p => p.value));
        case 3:
            // MAXIMUM
            return Math.max(...packet.subPackets.map(p => p.value));
        case 4:
            // LITERAL
            return packet.value;
        case 5:
            // GREATER THAN
            return packet.subPackets[0].value > packet.subPackets[1].value ? 1 : 0;
        case 6:
            // LESS THAN
            return packet.subPackets[0].value < packet.subPackets[1].value ? 1 : 0;
        case 7:
            // EQUAL TO
            return packet.subPackets[0].value === packet.subPackets[1].value ? 1 : 0;
        default:
            break;
    }
};

const parseNextPacket = (packet) => {
    const packetVersion = parseInt(packet.substring(0, 3), 2);
    const packetType = parseInt(packet.substring(3, 6), 2);

    if (packetType === 4) {
        // Literal value
        const parsedPacket = parseLiteralValuePacket(packet.substring(6));
        return {
            packetVersion,
            packetType,
            subPackets: [], // There aren't subpackets on a literal value
            value: parsedPacket.value,
            packetSize: parsedPacket.packetSize + 6,
        };
    } else {
        // Operation
        const parsedPacket = parseOperatorPacket(packet.substring(6));

        return {
            packetVersion,
            packetType,
            subPackets: parsedPacket.subPackets,
            value: calculateOperationValue(packetType, parsedPacket),
            packetSize: parsedPacket.packetSize + 6,
            lengthTypeID: parsedPacket.lengthTypeID,
        };
    }
};

const addAllVersionNumbers = (packet) => {
    let versionNumberSum = 0;
    versionNumberSum += packet.packetVersion;
    packet.subPackets.forEach(sp => {
        versionNumberSum += addAllVersionNumbers(sp);
    });

    return versionNumberSum;
};

export const calc1 = (input) => {
   const parsedPacket = parseNextPacket(input);

   return addAllVersionNumbers(parsedPacket);
}

export const calc2 = (input) => {
    const parsedPacket = parseNextPacket(input);

    return parsedPacket.value;
}
