package com.multitiers.domaine;

import java.util.List;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name ="mys_deck_dec")
public class Deck {
	@Id
    @Column(name = "dec_id", nullable = false, updatable = false)
	private String deckId;
	
	@OneToMany
	private List<Card> cardList;
	
	@ManyToOne
	private User owner;
}
