package fr.gael.dhus.server.http.webapp.owc.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.gael.dhus.database.object.User;
import fr.gael.dhus.service.UserService;
import fr.gael.dhus.service.exception.EmailNotSentException;
import fr.gael.dhus.service.exception.RootNotModifiableException;
import fr.gael.dhus.service.exception.UserNotExistingException;

@RestController
public class OwcUserController {
	
	private static Log logger = LogFactory.getLog(OwcUserController.class);
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/forgotpassword", method = RequestMethod.POST)
	public ResponseEntity<?>  forgotPassword(@RequestBody User user)
			throws RootNotModifiableException {
		int responseCode = 0;

		try {
			userService.forgotPassword ( user, "new/?r=");
		}
		catch(EmailNotSentException ex){
			return new ResponseEntity<>("{\"code\":\"error-sending-email\"}", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		catch (UserNotExistingException ex){
			return new ResponseEntity<>("{\"code\":\"user-not-found\"}", HttpStatus.BAD_REQUEST);
		}
		catch (Exception e) {
			return new ResponseEntity<>("{\"message\":\""+e.getMessage()+"\",\"code\":\"generic-error\"}", HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>("{\"code\":\""+responseCode+"\"}", HttpStatus.OK);
	}

}
