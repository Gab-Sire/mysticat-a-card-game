package com.multitiers.domaine.ingame;

import com.multitiers.domaine.entity.MinionCard;

public class PlayableMinionCard extends PlayableCard{
	private Integer initialPower;
	private Integer initialHealth;
	private Integer initialSpeed;
	
	
	
	public PlayableMinionCard() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PlayableMinionCard(MinionCard entityCard) {
		this.initialPower = entityCard.getInitialPower();
		this.initialHealth = entityCard.getInitialHealth();
		this.initialSpeed = entityCard.getInitialSpeed();
		this.manaCost = entityCard.getManaCost();
		this.description = entityCard.getCardDescription();
		this.name = entityCard.getCardName();
	}
	
	public Integer getInitialPower() {
		return initialPower;
	}

	public void setInitialPower(Integer initialPower) {
		this.initialPower = initialPower;
	}

	public Integer getInitialHealth() {
		return initialHealth;
	}

	public void setInitialHealth(Integer initialHealth) {
		this.initialHealth = initialHealth;
	}

	public Integer getInitialSpeed() {
		return initialSpeed;
	}

	public void setInitialSpeed(Integer initialSpeed) {
		this.initialSpeed = initialSpeed;
	}
	
	
	
}
