package funzbot;

import java.awt.Color;
import java.awt.Graphics2D;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

import javax.swing.JOptionPane;

import simple.api.script.Category;
import simple.api.script.ScriptManifest;
import simple.api.SimpleCombat.Style;
import simple.api.coords.WorldArea;
import simple.api.coords.WorldPoint;
import simple.api.events.ChatMessageEvent;
import simple.api.filters.SimpleSkills.Skill;
import simple.api.listeners.SimpleMessageListener;
import simple.api.queries.SimpleEntityQuery;
import simple.api.queries.SimpleItemQuery;
import simple.api.wrappers.*;
import simple.api.script.Script;
import simple.api.script.interfaces.SimplePaintable;


@ScriptManifest(author = "freakzoid", category = Category.OTHER, description = "", discord = "Funrun#0001",
name = "FunzTesting", servers = { "Xeros" }, version = "1")
public class Bots extends Script implements SimplePaintable, SimpleMessageListener {
	
    public static final WorldArea HOME_AREA = new WorldArea(
            new WorldPoint(3101, 3499, 0), new WorldPoint(3101, 3487, 0),
            new WorldPoint(3088, 3487, 0), new WorldPoint(3088, 3499, 0));

    public static final WorldArea BARROWS_AREA = new WorldArea(
            new WorldPoint(2655, 3736, 0),
            new WorldPoint(2691, 3709, 0));
	
	public boolean startUp = true;
	

	@Override
	public void onChatMessage(ChatMessageEvent arg0) {
		// TODO Auto-generated method stub5
		
	}

	@Override
	public void onPaint(Graphics2D g) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean onExecute() {


   	 //Instantiating the URL class
   	
   	return true;
		
	}

	@Override
	public void onProcess() {
		if (startUp == true) {
			if (!HOME_AREA.containsPoint(ctx.players.getLocal())) {
				ctx.magic.castHomeTeleport();
				ctx.sleep(1250);
	        }
			final SimpleNpc banker = ctx.npcs.populate().filter("Trading Clerk").filterHasAction("Bank").nearest().next();
			if (banker != null) {
                if (banker.interact(20)) {
                    ctx.onCondition(() -> ctx.bank.bankOpen(), 1250, 5);
                    ctx.onCondition(() -> ctx.bank.depositInventory(),1000,5);
                    ctx.onCondition(() -> ctx.bank.withdraw(1169, 1),1000,5);
                    ctx.onCondition(() -> ctx.bank.withdraw(1129, 1),1000,5);
                    ctx.onCondition(() -> ctx.bank.withdraw(1095, 1),1000,5);
                    ctx.onCondition(() -> ctx.bank.withdraw(863, 100),1000,5);
                    ctx.onCondition(() -> ctx.bank.withdraw(868, 100),1000,5);
                    ctx.onCondition(() -> ctx.bank.withdraw(1323, 1),1000,5);
                    ctx.onCondition(() -> ctx.bank.closeBank(),1000,5);
                    
                    
                    SimpleItem helm = ctx.inventory.populate().filter(1169).next();
                    SimpleItem body = ctx.inventory.populate().filter(1129).next();
                    SimpleItem legs = ctx.inventory.populate().filter(1095).next();
                    SimpleItem ironScim = ctx.inventory.populate().filter(1323).next();
                    
                    
                    
                    ctx.onCondition(() -> helm.interact(454),1000,5);
                    ctx.onCondition(() -> body.interact(454),1000,5);
                    ctx.onCondition(() -> legs.interact(454),1000,5);
                    ctx.onCondition(() -> ironScim.interact(454),1000,5);
                    ctx.combat.style(Style.CONTROLLED);
                    ctx.teleporter.teleportStringPath("Monsters", "Rock Crab");
                    ctx.menuActions.sendAction(10000, 0, 0, 45354);
                    ctx.sleep(1250);
                        
                    
                }
            }
			startUp = false;
		}
		
		
		if (HOME_AREA.containsPoint(ctx.players.getLocal())) {
			
			
            return;
        }	
		if(BARROWS_AREA.containsPoint(ctx.players.getLocal())) {
			System.out.println("001");
			
			 if (!ctx.players.getLocal().inCombat() || ctx.players.getLocal().getInteracting() == null) {
	             SimpleNpc fm = npcs(100).filter((n) -> n.getInteracting() != null && n.getInteracting().equals(ctx.players.getLocal()) && n.inCombat()).nearest().next();
	             SimpleNpc npc = fm != null ? fm : npcs(100).nearest().next();
	             if (npc == null) {
	                 ctx.prayers.disableAll();
	                 return;
	             }
	             npc.interact("attack");
	             ctx.onCondition(() -> ctx.players.getLocal().inCombat(), 250, 12);
	         }
			return;
			
		}
	
	}

	@Override
	public void onTerminate() {
		// TODO Auto-generated method stub
		
	}


	public void banking() {
		
		
	}
	public final SimpleEntityQuery<SimpleNpc> npcs(int npcVal) {
        return ctx.npcs.populate().filter(npcVal).filter((n) -> {
            if (n == null) {
                return false;
            }
            if (n.getId() == 10) return false;
            if (n.getLocation().distanceTo(ctx.players.getLocal().getLocation()) > 7) {
                return false;
            }
            if (n.inCombat() && n.getInteracting() != null && !n.getInteracting().equals(ctx.players.getLocal())) {
                return false;
            }
            if (n.isDead()) {
                return false;
            }
            return true;
        });
    }
	
}
