import serial
gps = serial.Serial('/dev/ttyACM0', baudrate=9600)
def convert_to_degrees(raw_value):
	decimal_value = raw_value/100.0
	degrees = int(decimal_value)
	mm_mmmm = (decimal_value - int(decimal_value))/0.6
	position = degrees + mm_mmmm
	position = "%.4f" %(position)
	return position

#print(data)
while True:
	line = gps.readline()
#	print (line)
	data = line.split(b",")
#	print(data[0])
	if data[0] == b'$GPRMC':
#		print(line)
		if data[2] == b'A':
#			print("Latitude:%s"%(data[3]))
#			print("Longitude:%s"%(data[5]))
			latitude = float(data[3])
			longitude = float(data[5])
#			print(latitude)
			lat = convert_to_degrees(latitude)
			long = convert_to_degrees(longitude)
			print("lat_degrees:",lat,data[4])
			print("long_degrees:",long,data[6])
