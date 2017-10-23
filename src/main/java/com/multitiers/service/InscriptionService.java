package com.multitiers.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multitiers.ProjetMultitiersApplication;
import com.multitiers.domaine.entity.Card;
import com.multitiers.domaine.entity.Deck;
import com.multitiers.domaine.entity.HeroPortrait;
import com.multitiers.domaine.entity.MinionCard;
import com.multitiers.domaine.entity.User;
import com.multitiers.domaine.entity.UserCredentials;
import com.multitiers.exception.BadCredentialsLoginException;
import com.multitiers.exception.BadPasswordFormatException;
import com.multitiers.exception.BadUsernameFormatException;
import com.multitiers.exception.UserAlreadyConnectedException;
import com.multitiers.repository.CardRepository;
import com.multitiers.repository.DeckRepository;
import com.multitiers.repository.MinionCardRepository;
import com.multitiers.repository.UserRepository;
import com.multitiers.util.ConnectionUtils;
import com.multitiers.util.Constantes;

@Service
public class InscriptionService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeckRepository deckRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private MinionCardRepository minionCardRepository;
    
    //Key: userId
    public Map<String, User> connectedUsers = new HashMap<String, User>();
    
    public InscriptionService() {}
    
    @Transactional
    public void bootStrapTwoUsersAndTestCardSet() {
    	//Methode qu'on va utiliser pour Bootstrapper
        for(int i=1; i<=Constantes.NB_OF_CARDS_IN_TEST_SET; ++i) {
        	Integer stats = (((i/5)<=0)) ? 1 : i/5;
        	int manaCost = 1;
            MinionCard card = createMinionCard("Minion"+i, stats, stats, stats, manaCost, stats+" mana"+" "+stats+"/"+stats);
            cardRepository.save(card);
        }
        
        User user1 = createUser("Chat1", "Myboy1", HeroPortrait.warriorHero);
        User user2 = createUser("Chat2", "Myboy2", HeroPortrait.zorroHero);
        userRepository.save(user1);
        userRepository.save(user2);
    }
    
    public  MinionCard createMinionCard(String name, Integer power, Integer health, Integer speed, Integer manaCost, String desc) {
    	MinionCard card = new MinionCard();
    	card.setCardId(ConnectionUtils.generateUUID().toString());
    	card.setCardName(name);
    	card.setInitialHealth(health);
    	card.setInitialPower(power);
    	card.setInitialSpeed(speed);
    	card.setManaCost(manaCost);
    	card.setCardDescription(desc);
    	return card;
    }
    
    public  User createUser(String username, String password, HeroPortrait portrait) {
    	if(!ConnectionUtils.isValidPassword(password)) {
    		throw new BadPasswordFormatException(password);
    	}
    	else if(!ConnectionUtils.isValidUsername(username)) {
    		throw new BadUsernameFormatException(username);
    	}
    	
    	String salt = ConnectionUtils.generateSalt();
    	String hashedPassword = ConnectionUtils.hashPassword(password, salt);
    	User user = new User(username, hashedPassword, salt);
    	user.setHeroPortrait(portrait);
    	user.setId(ConnectionUtils.generateUUID().toString());
    	assignStarterDeck(user);
        return user;
    }
    
	private  void assignStarterDeck(User user) {
		List<Deck> decks = new ArrayList<Deck>();
    	decks.add(createStarterDeck(user));
    	user.setDecks(decks);
	}
    
    public Deck createStarterDeck(User owner) {
    	Deck starterDeck = new Deck();
    	starterDeck.setDeckId(ConnectionUtils.generateUUID().toString());
    	List<Card> defaultCards = new ArrayList<Card>();
    	
    	for(int i=1; i<=Constantes.CONSTRUCTED_DECK_MAX_SIZE; ++i) {
    		Integer cardIndex = (int) (Math.random()*Constantes.NB_OF_CARDS_IN_TEST_SET)+1;
    		Card cardToAdd = cardRepository.findByCardName("Minion"+cardIndex);
    		defaultCards.add(cardToAdd);
    	}
    	
    	starterDeck.setCardList(defaultCards);
    	return starterDeck;
    }
    
    public User getUserFromCredentials(UserCredentials userCredentials) {
    	String username = userCredentials.getUsername();
        String password = userCredentials.getPassword();
    	User user = userRepository.findByUsername(username);
    	if(user==null) {
    		throw new BadCredentialsLoginException();
    	}
        String hashedSalt = user.getHashedSalt();
	     if(ConnectionUtils.hashPassword(password, hashedSalt).equals(user.getPasswordHash())) {
	    	 return user;
	     }
	     throw new BadCredentialsLoginException();
    }
    
    public void addUserToConnectedUsers(User user) {
    	if(this.connectedUsers==null) {
    		this.connectedUsers = new HashMap<String, User>();
    	}
    	if (this.connectedUsers.containsKey(user.getId())) {
        	throw new UserAlreadyConnectedException();
        }
    	else {
    		this.connectedUsers.put(user.getId(), user);
    	}
    }
    
}
