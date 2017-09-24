package com.multitiers.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.multitiers.domaine.User;
import com.multitiers.repository.CardRepository;
import com.multitiers.repository.DeckRepository;
import com.multitiers.repository.UserRepository;
import com.multitiers.service.InscriptionService;
import com.multitiers.util.ConnectionUtils;

@RestController
public class RestControlleur {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DeckRepository deckRepository;
	@Autowired
	private CardRepository cardRepository;
	
	@Autowired
	private InscriptionService inscriptionService;
	
    @GetMapping(value = "/getUserByName/{username}")
    public @ResponseBody User getUserByName(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        return user;
    }
    
    @GetMapping(value = "/attemptConnection/{username}/{password}")
    public @ResponseBody Boolean attemptConnection(@PathVariable String username, @PathVariable String password) {
        User user = userRepository.findByUsername(username);
        String hashedSalt = user.getHashedSalt();
        return ConnectionUtils.hashPassword(password, hashedSalt).equals(user.getPasswordHash());
    }
    
    @GetMapping(value = "/signUp/{username}/{password}")
    public @ResponseBody User signUpGet(@PathVariable String username, @PathVariable String password) {
    	User user = inscriptionService.createUser(username, password);
        userRepository.save(user);
    	return user;
    }
    
    //Fonction de signUp, mais avec le POST
    @RequestMapping(value = "/signUpPost/{username}/{password}", method=RequestMethod.POST)
    public @ResponseBody User signUpPost(@PathVariable String username, @PathVariable String password) {
    	User user = inscriptionService.createUser(username, password);
        userRepository.save(user);
    	return user;
    }
    
    //Fonction qui est lancee lorsqu'une erreur survient.
    @ExceptionHandler(value=Exception.class)
    public String errorMessage() {
    	return "Erreur";
    }
}
