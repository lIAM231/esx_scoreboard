local jobscount = {police = "low", ems = "low", taxi = "low"}
local Connectedplayers = {}
local fpscount = 0
local queueL = 0
local fps = 0
local open = false

RegisterNetEvent('jafar:GetConnectedPlayers')
AddEventHandler('jafar:GetConnectedPlayers', function(data,queue,jobsdata)
	queueL = queue
	jobscount = jobsdata
	Connectedplayers = data

	table.sort(Connectedplayers, function(a,b) 
		if (a ~= nil) and (b~= nil) then
		  return a.id < b.id
		end
	end)

	if open then
		SendNUIMessage({action = "display",  data = Connectedplayers,jobs =  jobscount,queue = queueL,fps = math.floor(fps/10)})
	end
end)

CreateThread(function()
	while true do
		fps = 0
		fps =  fpscount
		fpscount = 0
		if open then
			SendNUIMessage({action = "display",  data = Connectedplayers,jobs =  jobscount,queue = queueL,fps = math.floor(fps/10)})
		end
		Wait(10000)
	end
end)

CreateThread(function()
	while true do
		Wait(0)
		if IsControlJustReleased(0, 10) and not open then
			open = true
			SendNUIMessage({action = "display",  data = Connectedplayers,jobs =  jobscount,queue = queueL,fps = math.floor(fps/10)})
			SetNuiFocus(true,true)
		elseif IsControlJustReleased(0, 10) and open then
			open = false
			SendNUIMessage({action = "close", jobs =  jobscount})
			SetNuiFocus(false,false)
		elseif IsControlJustReleased(0, 192) and open then
			SetNuiFocus(true,true)
		end
		fpscount = fpscount + 1 
	end
end)

RegisterNUICallback('close', function(data, cb)
	open = false
    SetNuiFocus(false,false)
end)

RegisterNUICallback('NuiFocus', function(data, cb)
    SetNuiFocus(false,false)
end)